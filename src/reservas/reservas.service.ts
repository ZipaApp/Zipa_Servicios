import { Injectable, BadRequestException, Inject, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types  } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Reserva, ReservaDocument } from './schemas/reserva.schema';
import { CalendarioService } from '../calendario/calendario.service';
import { HistorialService } from '../historial/historial.service';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservasService {
  private readonly logger = new Logger(ReservasService.name);

  constructor(
    @InjectModel(Reserva.name)
    private reservaModel: Model<ReservaDocument>,
    private readonly calendarioService: CalendarioService,
    private readonly historialService: HistorialService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  // =====================================================
  // 🧾 Crear una nueva reserva
  // =====================================================
  async crearReserva(data: CreateReservaDto) {
    const { calendarioId, servicioId, mascotaId, nombreMascota, fecha, horaInicio, horaFin } = data;

    // Verificar que la franja exista y esté disponible
    const franja = await this.calendarioService.actualizarDisponibilidad(calendarioId, {
      disponible: false,
    });

    if (!franja) {
      throw new NotFoundException('La franja seleccionada no existe o no está disponible.');
    }

    // Crear reserva
    const reserva = new this.reservaModel({
      mascotaId,
      nombreMascota,
      servicioId,
      calendarioId,
      fecha,
      horaInicio,
      horaFin,
      estado: 'confirmada',
      observaciones: data.observaciones,
    });

    await reserva.save();

    // Vincular reserva al calendario
    await this.calendarioService.actualizarDisponibilidad(calendarioId, {
      reservaId: (reserva._id as Types.ObjectId).toString(),
    });

    // Emitir evento de notificación
    this.notificationClient.emit('reserva.creada', {
      data: {
        reservaId: (reserva._id as Types.ObjectId).toString(),
        mascotaId,
        nombreMascota,
        servicioId,
        fecha,
        horaInicio,
      },
    });

    this.logger.log(`📩 Notificación emitida: reserva.creada (${reserva._id})`);

    // Programar recordatorio
    this.programarRecordatorio(reserva);

    return reserva;
  }

  // =====================================================
  // 📋 Obtener todas las reservas
  // =====================================================
  async obtenerReservas() {
    return this.reservaModel
      .find()
      .populate('calendarioId')
      .populate('servicioId')
      .sort({ fecha: -1 })
      .exec();
  }

  // =====================================================
  // 🐶 Obtener reservas por mascota
  // =====================================================
  async obtenerPorMascota(mascotaId: string) {
    return this.reservaModel.find({ mascotaId }).sort({ fecha: -1 }).exec();
  }

  // =====================================================
  // 🔄 Actualizar estado
  // =====================================================
  async actualizarEstado(id: string, estado: string) {
    const reserva = await this.reservaModel.findById(id);
    if (!reserva) throw new BadRequestException('Reserva no encontrada');

    reserva.estado = estado as any;
    await reserva.save();

    this.logger.log(`🔄 Estado actualizado a "${estado}" para reserva ${id}`);

    // === Eventos según el nuevo estado ===
    if (estado === 'cancelada') {
      this.cancelarRecordatorio(id);

      // Liberar franja
      if (reserva.calendarioId) {
        await this.calendarioService.actualizarDisponibilidad(reserva.calendarioId, {
          disponible: true,
          reservaId: null,
        });
      }

      this.notificationClient.emit('reserva.cancelada', {
        data: {
          reservaId: id,
          mensaje: `Tu reserva fue cancelada.`,
        },
      });
    }

    // === Registrar en historial cuando se completa ===
    else if (estado === 'completada') {
      this.cancelarRecordatorio(id);

      // Crear registro en historial
      try {
        await this.historialService.crearHistorial({
          mascotaId: reserva.mascotaId,
          nombreMascota: reserva.nombreMascota,
          tipoServicio: reserva.servicioId?.toString() || 'desconocido',
          calendarioId: reserva.calendarioId?.toString(),
          fechaServicio: reserva.fecha,
          observaciones: reserva.observaciones || '',
          cancelado: false,
        });

        this.logger.log(`📚 Historial creado para reserva ${id}`);
      } catch (error) {
        this.logger.error(`Error al crear historial para reserva ${id}: ${error.message}`);
      }

      this.notificationClient.emit('reserva.completada', {
        data: {
          reservaId: id,
          mensaje: `Tu reserva ha sido completada exitosamente.`,
        },
      });
    }

    return reserva;
  }

  // =====================================================
  // ❌ Cancelar reserva
  // =====================================================
  async cancelarReserva(reservaId: string): Promise<ReservaDocument> {
    const reserva = await this.reservaModel.findById(reservaId);
    if (!reserva) throw new BadRequestException('Reserva no encontrada');

    reserva.estado = 'cancelada';
    await reserva.save();

    // Liberar franja
    if (reserva.calendarioId) {
      await this.calendarioService.actualizarDisponibilidad(reserva.calendarioId, {
        disponible: true,
        reservaId: null,
      });
    }

    // Cancelar recordatorio
    this.cancelarRecordatorio(reservaId);

    // Emitir evento
    this.notificationClient.emit('reserva.cancelada', {
      data: {
        reservaId,
        mensaje: `Tu reserva fue cancelada.`,
      },
    });

    this.logger.log(`❌ Reserva ${reservaId} cancelada`);
    return reserva;
  }

  // =====================================================
  // 🔔 Programar recordatorio 24h antes
  // =====================================================
  private programarRecordatorio(reserva: ReservaDocument) {
    const fechaReserva = new Date(reserva.fecha);
    const fechaRecordatorio = new Date(fechaReserva.getTime() - 24 * 60 * 60 * 1000);
    const delay = fechaRecordatorio.getTime() - Date.now();
    const recordatorioName = `reserva-${reserva._id}-recordatorio-24h`;

    if (delay > 0) {
      const callback = () => {
        this.notificationClient.emit('reserva.proxima', {
          data: {
            reservaId: reserva._id,
            mascotaId: reserva.mascotaId,
            fecha: reserva.fecha,
            mensaje: `Tu reserva es dentro de las próximas 24 horas.`,
          },
        });
        this.logger.log(`⏰ Recordatorio emitido para reserva ${reserva._id}`);
      };

      const timeout = setTimeout(callback, delay);
      this.schedulerRegistry.addTimeout(recordatorioName, timeout);
      this.logger.log(`🕒 Recordatorio programado para ${reserva._id}`);
    } else {
      this.logger.warn(`⚠️ Recordatorio no programado: fecha ya pasada`);
    }
  }

  // =====================================================
  // 🗑️ Cancelar recordatorio
  // =====================================================
  private cancelarRecordatorio(reservaId: string) {
    const recordatorioName = `reserva-${reservaId}-recordatorio-24h`;

    try {
      this.schedulerRegistry.deleteTimeout(recordatorioName);
      this.logger.log(`🗑️ Recordatorio cancelado para ${reservaId}`);
    } catch (err) {
      this.logger.warn(`⚠️ No había recordatorio programado para ${reservaId}`);
    }
  }
}

