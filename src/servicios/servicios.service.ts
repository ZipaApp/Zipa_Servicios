import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeluqueriaServicio } from './schemas/peluqueria.schema';
import { VeterinariaServicio } from './schemas/veterinaria.schema';
import { GuarderiaServicio } from './schemas/guarderia.schema';
import { PaseoServicio } from './schemas/paseo.schema';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectModel(PeluqueriaServicio.name)
    private peluqueriaModel: Model<PeluqueriaServicio>,

    @InjectModel(VeterinariaServicio.name)
    private veterinariaModel: Model<VeterinariaServicio>,

    @InjectModel(GuarderiaServicio.name)
    private guarderiaModel: Model<GuarderiaServicio>,

    @InjectModel(PaseoServicio.name)
    private paseoModel: Model<PaseoServicio>,
  ) {}

  private getModel(type: string): Model<any> {
    switch (type.toLowerCase()) {
      case 'peluqueria': return this.peluqueriaModel;
      case 'veterinaria': return this.veterinariaModel;
      case 'guarderia': return this.guarderiaModel;
      case 'paseo': return this.paseoModel;
      default:
        throw new BadRequestException(`Tipo de servicio no válido: ${type}`);
    }
  }

  async findAll(type: string) {
    return this.getModel(type).find().exec();
  }

  async findOne(type: string, id: string) {
    const result = await this.getModel(type).findById(id).exec();
    if (!result) throw new NotFoundException(`${type} con ID ${id} no encontrado`);
    return result;
  }

  async create(type: string, data: any) {
    const model = this.getModel(type);
    const doc = new model(data);
    return doc.save();
  }

  async update(type: string, id: string, data: any) {
    const result = await this.getModel(type)
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();

    if (!result) throw new NotFoundException(`${type} con ID ${id} no encontrado`);
    return result;
  }

  async remove(type: string, id: string) {
    const result = await this.getModel(type).findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`${type} con ID ${id} no encontrado`);
    return { message: `${type} con ID ${id} eliminado correctamente` };
  }
}

