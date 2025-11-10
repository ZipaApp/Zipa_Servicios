import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ServicioBase {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: number; // minutos

  @Prop({ required: true })
  assignedTo: string; // o ObjectId si hay relación con usuario

  @Prop({ default: true })
  active: boolean;
}

