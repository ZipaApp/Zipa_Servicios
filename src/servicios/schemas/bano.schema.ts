import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServicioBase } from './servicio-base.schema';

export type BanoDocument = Bano & Document;

@Schema({ timestamps: true })
export class Bano extends ServicioBase {}

export const BanoSchema = SchemaFactory.createForClass(Bano);

