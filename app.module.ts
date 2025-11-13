import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ServiciosModule } from './servicios/servicios.module';
import { CalendarioModule } from './calendario/calendario.module';
import { HistorialModule } from './historial/historial.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    // 🔹 Conexión Mongo
    MongooseModule.forRoot('mongodb://mongo:27017/ecommerce_services'),

    // 🔹 Activar tareas programadas (para recordatorios)
    ScheduleModule.forRoot(),

    // 🔹 Módulos funcionales
    ServiciosModule,
    CalendarioModule,
    HistorialModule,
    ReservasModule,
  ],
})
export class AppModule {}

