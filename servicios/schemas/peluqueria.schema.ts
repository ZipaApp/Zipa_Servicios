import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServicioBase } from './servicio-base.schema';

export enum TipoPeluqueria {
  BANO = 'baño',
  CORTE = 'corte',
  BANO_CORTE = 'baño y corte',
  DESLANADO = 'deslanado',
}

@Schema({ timestamps: true, collection: 'servicios_peluqueria' })
export class PeluqueriaServicio extends ServicioBase {
  @Prop({ enum: TipoPeluqueria, required: true })
  tipo: TipoPeluqueria;

  @Prop({ default: false })
  incluyeTransporte: boolean;

  @Prop({ type: [String], default: [] })
  productosUsados?: string[]; // shampoos, colonias, etc.
}

export const PeluqueriaServicioSchema = SchemaFactory.createForClass(PeluqueriaServicio);

