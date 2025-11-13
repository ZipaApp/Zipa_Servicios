import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServicioBase } from './servicio-base.schema';

export enum TipoPaseo {
  INDIVIDUAL = 'individual',
  GRUPAL = 'grupal',
}

@Schema({ timestamps: true, collection: 'servicios_paseo' })
export class PaseoServicio extends ServicioBase {
  @Prop({ enum: TipoPaseo, required: true })
  tipoPaseo: TipoPaseo;

  @Prop({ required: true, min: 1 })
  duracionPaseo: number; // minutos

  @Prop()
  zona?: string; // barrio o parque asignado
}

export const PaseoServicioSchema = SchemaFactory.createForClass(PaseoServicio);

