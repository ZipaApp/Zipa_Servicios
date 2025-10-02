import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CorteUnasDocument = CorteUnas & Document;

@Schema({ timestamps: true })
export class CorteUnas {
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

export const CorteUnasSchema = SchemaFactory.createForClass(CorteUnas);

