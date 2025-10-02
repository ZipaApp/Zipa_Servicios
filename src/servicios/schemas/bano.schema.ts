import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BanoDocument = Bano & Document;

@Schema({ timestamps: true })
export class Bano {
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

export const BanoSchema = SchemaFactory.createForClass(Bano);

