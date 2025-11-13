import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';

import { PeluqueriaServicio, PeluqueriaServicioSchema } from './schemas/peluqueria.schema';
import { VeterinariaServicio, VeterinariaServicioSchema } from './schemas/veterinaria.schema';
import { GuarderiaServicio, GuarderiaServicioSchema } from './schemas/guarderia.schema';
import { PaseoServicio, PaseoServicioSchema } from './schemas/paseo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeluqueriaServicio.name, schema: PeluqueriaServicioSchema },
      { name: VeterinariaServicio.name, schema: VeterinariaServicioSchema },
      { name: GuarderiaServicio.name, schema: GuarderiaServicioSchema },
      { name: PaseoServicio.name, schema: PaseoServicioSchema },
    ]),
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosService], 
})
export class ServiciosModule {}

