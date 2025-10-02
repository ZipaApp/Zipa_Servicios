import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaseoDocument = Paseo & Document;

@Schema({ timestamps: true })
export class Paseo {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  assignedTo: string;

  @Prop({ default: true })
  active: boolean;
}

export const PaseoSchema = SchemaFactory.createForClass(Paseo);

