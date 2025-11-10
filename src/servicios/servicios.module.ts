import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiciosController } from './servicios.controller';
import { ServiciosService } from './servicios.service';
import { Bano, BanoSchema, Paseo, PaseoSchema, Vacunacion, VacunacionSchema, CorteUnas, CorteUnasSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bano.name, schema: BanoSchema },
      { name: Paseo.name, schema: PaseoSchema },
      { name: Vacunacion.name, schema: VacunacionSchema },
      { name: CorteUnas.name, schema: CorteUnasSchema },
    ]),
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService],
  exports: [ServiciosService],
})
export class ServiciosModule {}

