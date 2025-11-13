import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarioController } from './calendario.controller';
import { CalendarioService } from './calendario.service';
import { Calendario, CalendarioSchema } from './schemas/calendario.schema';
import { ServicioBase, ServicioBaseSchema } from '../servicios/schemas/servicio-base.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calendario.name, schema: CalendarioSchema },
      { name: ServicioBase.name, schema: ServicioBaseSchema },
    ]),
  ],
  controllers: [CalendarioController],
  providers: [CalendarioService, Logger],
  exports: [CalendarioService], // 👉 para que Reservas u otros módulos puedan usarlo
})
export class CalendarioModule {}

