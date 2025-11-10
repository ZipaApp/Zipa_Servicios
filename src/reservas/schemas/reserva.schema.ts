import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservaDocument = Reserva & Document;

@Schema({ timestamps: true })
export class Reserva {
  @Prop({ required: true })
  mascotaId: string;

  @Prop({ required: true })
  nombreMascota: string;

  @Prop({ required: true })
  tipoServicio: string; // 'bano', 'paseo', etc.

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  horaInicio: string;

  @Prop({ required: true })
  horaFin: string;

  @Prop({ default: 'pendiente' })
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

  @Prop({ type: Types.ObjectId, ref: 'Calendario', required: false })
  calendarioId?: string;

  @Prop()
  observaciones?: string;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);

