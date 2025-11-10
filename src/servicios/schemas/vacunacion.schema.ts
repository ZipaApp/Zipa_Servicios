import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServicioBase } from './servicio-base.schema';

export type VacunacionDocument = Vacunacion & Document;

@Schema({ timestamps: true })
export class Vacunacion extends ServicioBase {}

export const VacunacionSchema = SchemaFactory.createForClass(Vacunacion);

