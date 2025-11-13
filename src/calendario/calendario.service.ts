import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Calendario, CalendarioDocument } from './schemas/calendario.schema';

@Injectable()
export class CalendarioService {
  private readonly logger = new Logger(CalendarioService.name);

  constructor(
    @InjectModel(Calendario.name)
    private readonly calendarioModel: Model<CalendarioDocument>,
  ) {}

  // =====================================================
  // 🧩 Crear nueva franja de disponibilidad
  // =====================================================
  async crearDisponibilidad(data: any) {
    if (!data.servicioId) {
      throw new BadRequestException('El campo servicioId es obligatorio');
    }

    // Evitar solapamientos
    const existe = await this.calendarioModel.findOne({
      servicioId: new Types.ObjectId(data.servicioId),
      fecha: data.fecha,
      horaInicio: data.horaInicio,
      horaFin: data.horaFin,
    });

    if (existe) {
      throw new BadRequestException('Ya existe una franja para esa hora y servicio.');
    }

    const slot = new this.calendarioModel({
      ...data,
      servicioId: new Types.ObjectId(data.servicioId),
      disponible: data.disponible ?? true,
      reservaId: null,
    });

    const guardado = await slot.save();
    this.logger.log(`🗓️ Franja creada para servicio ${data.servicioId}`);
    return guardado;
  }

  // =====================================================
  // 📅 Obtener disponibilidad por servicio o fecha
  // =====================================================
  async obtenerDisponibilidad(servicioId: string, fecha?: string) {
  const filtro: any = { servicioId: new Types.ObjectId(servicioId) };
  if (fecha) filtro.fecha = new Date(fecha); // mantiene el tipo Date

  const franjas = await this.calendarioModel
    .find(filtro)
    .populate('servicioId')
    .sort({ horaInicio: 1 })
    .exec();

  this.logger.log(
    `📋 ${franjas.length} franjas obtenidas para servicio ${servicioId}${fecha ? ' en ' + fecha : ''}`,
  );
  return franjas;
}

  // =====================================================
  // 🔄 Actualizar disponibilidad o asignar reserva
  // =====================================================
  async actualizarDisponibilidad(id: string, data: Partial<Calendario>) {
    const actualizado = await this.calendarioModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!actualizado) {
      throw new BadRequestException('No se encontró la franja de calendario');
    }

    this.logger.log(`🆙 Disponibilidad actualizada para franja ${id}`);
    return actualizado;
  }

  // =====================================================
  // ❌ Eliminar franja de disponibilidad
  // =====================================================
  async eliminarDisponibilidad(id: string) {
    const eliminado = await this.calendarioModel.findByIdAndDelete(id).exec();

    if (!eliminado) {
      throw new BadRequestException('Franja no encontrada o ya eliminada.');
    }

    this.logger.log(`🗑️ Franja eliminada: ${id}`);
    return eliminado;
  }

  // =====================================================
  // 🧭 Liberar franja (usado al cancelar reservas)
  // =====================================================
  async liberarFranja(franjaId: string) {
    const actualizado = await this.calendarioModel
      .findByIdAndUpdate(
        franjaId,
        { disponible: true, reservaId: null },
        { new: true },
      )
      .exec();

    if (actualizado) {
      this.logger.log(`🔓 Franja ${franjaId} liberada`);
    }

    return actualizado;
  }
}

