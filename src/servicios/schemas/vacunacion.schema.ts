import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VacunacionDocument = Vacunacion & Document;

@Schema({ timestamps: true })
export class Vacunacion {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: number; // minutos

  @Prop({ required: true })
  assignedTo: string;

  @Prop({ default: true })
  active: boolean;
}

export const VacunacionSchema = SchemaFactory.createForClass(Vacunacion);

