import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Historial, HistorialDocument } from './schemas/historial.schema';

@Injectable()
export class HistorialService {
  private readonly logger = new Logger(HistorialService.name);

  constructor(
    @InjectModel(Historial.name)
    private readonly historialModel: Model<HistorialDocument>,
  ) {}

  // =====================================================
  // 🆕 Crear registro en el historial (usado desde Reservas)
  // =====================================================
  async crearHistorial(data: {
    mascotaId: string;
    nombreMascota: string;
    tipoServicio: string;
    calendarioId?: string;
    fechaServicio: Date;
    observaciones?: string;
    cancelado?: boolean;
  }): Promise<Historial> {
    const { mascotaId, nombreMascota, tipoServicio, fechaServicio } = data;

    if (!mascotaId || !nombreMascota || !tipoServicio || !fechaServicio) {
      throw new BadRequestException('Faltan campos obligatorios para el historial.');
    }

    // Evitar duplicar historial del mismo servicio en la misma fecha
    const existe = await this.historialModel.findOne({
      mascotaId,
      tipoServicio,
      fechaServicio,
    });

    if (existe) {
      this.logger.warn(`⚠️ Historial ya existente para ${nombreMascota} en ${fechaServicio}`);
      return existe;
    }

    const nuevoHistorial = new this.historialModel({
      ...data,
      cancelado: data.cancelado ?? false,
    });

    const guardado = await nuevoHistorial.save();
    this.logger.log(`📚 Nuevo historial creado para ${nombreMascota} (${tipoServicio})`);
    return guardado;
  }

  // =====================================================
  // 📖 Obtener historial por mascota
  // =====================================================
  async obtenerHistorialPorMascota(mascotaId: string): Promise<Historial[]> {
    return this.historialModel
      .find({ mascotaId })
      .populate('calendarioId')
      .sort({ fechaServicio: -1 })
      .exec();
  }

  // =====================================================
  // ✏️ Actualizar registro existente
  // =====================================================
  async actualizarRegistro(id: string, data: any): Promise<Historial> {
    const actualizado = await this.historialModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!actualizado) {
      throw new NotFoundException(`Registro con id ${id} no encontrado`);
    }
    return actualizado;
  }

  // =====================================================
  // ❌ Eliminar registro del historial
  // =====================================================
  async eliminarRegistro(id: string): Promise<void> {
    const eliminado = await this.historialModel.findByIdAndDelete(id).exec();
    if (!eliminado) {
      throw new NotFoundException(`Registro con id ${id} no encontrado`);
    }
    this.logger.log(`🗑️ Historial ${id} eliminado`);
  }

  // =====================================================
  // 📋 Listar todos los historiales
  // =====================================================
  async listarTodos(): Promise<Historial[]> {
    return this.historialModel.find().populate('calendarioId').exec();
  }
}

