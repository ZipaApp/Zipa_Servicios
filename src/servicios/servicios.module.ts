import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Vacunacion, VacunacionSchema } from './schemas/vacunacion.schema';
import { Paseo, PaseoSchema } from './schemas/paseo.schema';
import { Bano, BanoSchema } from './schemas/bano.schema';
import { CorteUnas, CorteUnasSchema } from './schemas/corteUnas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vacunacion.name, schema: VacunacionSchema },
      { name: Paseo.name, schema: PaseoSchema },
      { name: Bano.name, schema: BanoSchema },
      { name: CorteUnas.name, schema: CorteUnasSchema },
    ]),
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}

