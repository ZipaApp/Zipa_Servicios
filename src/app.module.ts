import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiciosModule } from './servicios/servicios.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/ecommerce_services'),
    ServiciosModule,
  ],
})
export class AppModule {}

