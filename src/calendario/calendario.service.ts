import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calendario, CalendarioDocument } from './schemas/calendario.schema';

@Injectable()
export class CalendarioService {
  constructor(
    @InjectModel(Calendario.name)
    private calendarioModel: Model<CalendarioDocument>,
  ) {}

  async crearDisponibilidad(data: any) {
    const slot = new this.calendarioModel(data);
    return slot.save();
  }

  async obtenerDisponibilidad(servicio: string, fecha?: string) {
    const filtro: any = { servicio };
    if (fecha) filtro.fecha = new Date(fecha);
    return this.calendarioModel.find(filtro).exec();
  }

  async actualizarDisponibilidad(id: string, data: any) {
    return this.calendarioModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async eliminarDisponibilidad(id: string) {
    return this.calendarioModel.findByIdAndDelete(id).exec();
  }
}

