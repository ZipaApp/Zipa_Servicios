import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Historial, HistorialDocument } from './schemas/historial.schema';

@Injectable()
export class HistorialService {
  constructor(
    @InjectModel(Historial.name)
    private historialModel: Model<HistorialDocument>,
  ) {}

  async registrarServicio(data: any) {
    const nuevo = new this.historialModel(data);
    return nuevo.save();
  }

  async obtenerPorMascota(mascotaId: string) {
    return this.historialModel.find({ mascotaId }).sort({ fechaServicio: -1 }).exec();
  }

  async obtenerTodos() {
    return this.historialModel.find().exec();
  }

  async actualizar(id: string, data: any) {
    return this.historialModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async eliminar(id: string) {
    return this.historialModel.findByIdAndDelete(id).exec();
  }
}

