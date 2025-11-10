import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HistorialDocument = Historial & Document;

@Schema({ timestamps: true })
export class Historial {
  @Prop({ required: true })
  mascotaId: string; // ID de la mascota

  @Prop({ required: true })
  nombreMascota: string;

  @Prop({ required: true })
  tipoServicio: string; // bano, paseo, vacunacion, corteunas

  @Prop({ type: Types.ObjectId, ref: 'Calendario', required: false })
  calendarioId?: string; // Referencia opcional al calendario usado

  @Prop({ required: true })
  fechaServicio: Date;

  @Prop()
  observaciones?: string;

  @Prop({ default: false })
  cancelado: boolean;
}

export const HistorialSchema = SchemaFactory.createForClass(Historial);

