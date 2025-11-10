import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserva, ReservaSchema } from './schemas/reserva.schema';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { CalendarioModule } from '../calendario/calendario.module';
import { HistorialModule } from '../historial/historial.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),
    CalendarioModule,
    HistorialModule,
  ],
  providers: [ReservasService],
  controllers: [ReservasController],
})
export class ReservasModule {}

