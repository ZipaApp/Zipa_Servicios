import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServicioBase } from './servicio-base.schema';

export enum TipoVeterinaria {
  CONSULTA = 'consulta general',
  VACUNACION = 'vacunación',
  DESPARASITACION = 'desparasitación',
  CONTROL = 'control',
}

@Schema({ timestamps: true, collection: 'servicios_veterinaria' })
export class VeterinariaServicio extends ServicioBase {
  @Prop({ enum: TipoVeterinaria, required: true })
  tipo: TipoVeterinaria;

  @Prop()
  veterinario?: string; // nombre del veterinario

  @Prop({ default: false })
  requiereAyuno: boolean;
}

export const VeterinariaServicioSchema = SchemaFactory.createForClass(VeterinariaServicio);

