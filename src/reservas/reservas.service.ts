import { Injectable, BadRequestException, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Reserva, ReservaDocument } from './schemas/reserva.schema';
import { CalendarioService } from '../calendario/calendario.service';
import { HistorialService } from '../historial/historial.service';

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
  async crearReserva(data: any) {
    const disponibles = await this.calendarioService.obtenerDisponibilidad(
      data.tipoServicio,
      data.fecha,
    );

    const franja = disponibles.find(
      (slot) =>
        slot.horaInicio === data.horaInicio &&
        slot.horaFin === data.horaFin &&
        slot.disponible === true,
    );

    if (!franja) {
      throw new BadRequestException('No hay disponibilidad en esa fecha y hora.');
    }

    const reserva = new this.reservaModel({
      ...data,
      estado: 'confirmada',
      calendarioId: franja._id,
    });
    await reserva.save();

    await this.calendarioService.actualizarDisponibilidad(String(franja._id), {
      disponible: false,
      reservaId: reserva._id,
    });

    // 🔹 Emitir evento de creación
    this.notificationClient.emit('reserva.creada', {
      data: {
        reservaId: reserva._id,
        mascotaId: reserva.mascotaId,
        nombreMascota: reserva.nombreMascota,
        tipoServicio: reserva.tipoServicio,
        fecha: reserva.fecha,
        horaInicio: reserva.horaInicio,
      },
    });

    this.logger.log(`📩 Notificación emitida: reserva.creada (${reserva._id})`);

    // 🔹 Programar recordatorio 24h antes
    this.programarRecordatorio(reserva);

    return reserva;
  }

  // =====================================================
  // 📋 Obtener todas las reservas
  // =====================================================
  async obtenerReservas() {
    return this.reservaModel.find().sort({ fecha: -1 }).exec();
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

    // Emitir evento según el nuevo estado
    if (estado === 'cancelada') {
      this.cancelarRecordatorio(id);
      this.notificationClient.emit('reserva.cancelada', {
        data: {
          reservaId: id,
          mensaje: `Tu reserva de ${reserva.tipoServicio} fue cancelada.`,
        },
      });
    } else if (estado === 'completada') {
      this.cancelarRecordatorio(id);
      this.notificationClient.emit('reserva.completada', {
        data: {
          reservaId: id,
          mensaje: `Tu reserva de ${reserva.tipoServicio} ha sido completada exitosamente.`,
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
        mensaje: `Tu reserva de ${reserva.tipoServicio} fue cancelada.`,
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
            tipoServicio: reserva.tipoServicio,
            fecha: reserva.fecha,
            mensaje: `Tu reserva de ${reserva.tipoServicio} es dentro de las próximas 24 horas.`,
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
  // 🗑️ Cancelar recordatorio (auxiliar)
  // =====================================================
  private cancelarRecordatorio(reservaId: string) {
    const recordatorioName = `reserva-${reservaId}-recordatorio-24h`;

    try {
      this.schedulerRegistry.deleteTimeout(recordatorioName);
      this.logger.log(`🗑️ Recordatorio ${recordatorioName} cancelado`);
    } catch {
      this.logger.warn(`⚠️ No se pudo cancelar el recordatorio ${recordatorioName}`);
    }
  }
}

