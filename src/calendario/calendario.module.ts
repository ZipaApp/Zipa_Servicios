import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendario, CalendarioSchema } from './schemas/calendario.schema';
import { CalendarioService } from './calendario.service';
import { CalendarioController } from './calendario.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Calendario.name, schema: CalendarioSchema }])],
  providers: [CalendarioService],
  controllers: [CalendarioController],
  exports: [CalendarioService],
})
export class CalendarioModule {}

