import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacunacion, VacunacionDocument } from './schemas/vacunacion.schema';
import { Paseo, PaseoDocument } from './schemas/paseo.schema';
import { Bano, BanoDocument } from './schemas/bano.schema';
import { CorteUnas, CorteUnasDocument } from './schemas/corteUnas.schema';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectModel(Vacunacion.name) private vacunacionModel: Model<VacunacionDocument>,
    @InjectModel(Paseo.name) private paseoModel: Model<PaseoDocument>,
    @InjectModel(Bano.name) private banoModel: Model<BanoDocument>,
    @InjectModel(CorteUnas.name) private corteUnasModel: Model<CorteUnasDocument>,
  ) {}

  private getModel(type: string): Model<any> {
    switch (type.toLowerCase()) {
      case 'vacunacion': return this.vacunacionModel;
      case 'paseo': return this.paseoModel;
      case 'bano': return this.banoModel;
      case 'corteunas': return this.corteUnasModel;
      default: throw new Error('Tipo de servicio no válido');
    }
  }

  async findAll(type: string) {
    return this.getModel(type).find().exec();
  }

  async findOne(type: string, id: string) {
    return this.getModel(type).findById(id).exec();
  }

  async create(type: string, data: any) {
    const doc = new (this.getModel(type))(data);
    return doc.save();
  }

  async update(type: string, id: string, data: any) {
    return this.getModel(type).findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(type: string, id: string) {
    return this.getModel(type).findByIdAndDelete(id).exec();
  }
}

