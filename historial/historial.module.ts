import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialController } from './historial.controller';
import { HistorialService } from './historial.service';
import { Historial, HistorialSchema } from './schemas/historial.schema';
import { Calendario, CalendarioSchema } from '../calendario/schemas/calendario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
      { name: Calendario.name, schema: CalendarioSchema },
    ]),
  ],
  controllers: [HistorialController],
  providers: [HistorialService, Logger],
  exports: [HistorialService],
})
export class HistorialModule {}

