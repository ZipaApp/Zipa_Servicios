import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServicioBase } from './servicio-base.schema';

export enum ModalidadGuarderia {
  MEDIO_DIA = 'medio día',
  DIA_COMPLETO = 'día completo',
  NOCHE = 'noche',
}

@Schema({ timestamps: true, collection: 'servicios_guarderia' })
export class GuarderiaServicio extends ServicioBase {
  @Prop({ enum: ModalidadGuarderia, required: true })
  modalidad: ModalidadGuarderia;

  @Prop({ default: false })
  incluyeAlimentacion: boolean;
}

export const GuarderiaServicioSchema = SchemaFactory.createForClass(GuarderiaServicio);

