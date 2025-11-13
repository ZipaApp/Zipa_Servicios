import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservaDocument = Reserva & Document;

@Schema({ timestamps: true })
export class Reserva {
  @Prop({ required: true })
  mascotaId: string;

  @Prop({ required: true })
  nombreMascota: string;

  @Prop({ type: Types.ObjectId, ref: 'ServicioBase', required: true })
  servicioId: string; // referencia al servicio reservado

  @Prop({ type: Types.ObjectId, ref: 'Calendario', required: true })
  calendarioId: string; // referencia al calendario asociado

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  horaInicio: string;

  @Prop({ required: true })
  horaFin: string;

  @Prop({ default: 'pendiente' })
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

  @Prop()
  observaciones?: string;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);

