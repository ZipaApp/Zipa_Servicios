import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServicioBase } from './servicio-base.schema';

export type CorteUnasDocument = CorteUnas & Document;

@Schema({ timestamps: true })
export class CorteUnas extends ServicioBase {}

export const CorteUnasSchema = SchemaFactory.createForClass(CorteUnas);
