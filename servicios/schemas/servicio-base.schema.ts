import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ServicioBase extends Document {
  @Prop({ required: true, maxlength: 100 })
  nombre: string;

  @Prop({ maxlength: 500 })
  descripcion?: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ required: true, min: 1 })
  duracion: number; // minutos

  @Prop({ default: true })
  activo: boolean;
}

export const ServicioBaseSchema = SchemaFactory.createForClass(ServicioBase);

