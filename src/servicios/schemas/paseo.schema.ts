import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServicioBase } from './servicio-base.schema';

export type PaseoDocument = Paseo & Document;

@Schema({ timestamps: true })
export class Paseo extends ServicioBase {}

export const PaseoSchema = SchemaFactory.createForClass(Paseo);

