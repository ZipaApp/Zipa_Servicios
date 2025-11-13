import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ServicioBase } from '../../servicios/schemas/servicio-base.schema';


export type CalendarioDocument = Calendario & Document;

@Schema({ timestamps: true })
export class Calendario {
  @Prop({ type: Types.ObjectId, ref: 'ServicioBase', required: true })
  servicioId: string; // referencia al servicio

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  horaInicio: string; // '10:00'
  
  @Prop({ required: true })
  horaFin: string; // '11:00'

  @Prop({ default: true })
  disponible: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Reserva', default: null })
  reservaId?: string | null;
}

export const CalendarioSchema = SchemaFactory.createForClass(Calendario);

