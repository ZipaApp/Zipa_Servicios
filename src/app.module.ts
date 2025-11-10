import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule'; // 👈 IMPORTANTE
import { ServiciosModule } from './servicios/servicios.module';
import { CalendarioModule } from './calendario/calendario.module';
import { HistorialModule } from './historial/historial.module';
import { ReservasModule } from './reservas/reservas.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // 🔹 Conexión Mongo
    MongooseModule.forRoot('mongodb://mongo:27017/ecommerce_services'),

    // 🔹 Activar tareas programadas
    ScheduleModule.forRoot(), // 👈 Esto habilita los cron jobs en toda la app

    // 🔹 Módulos funcionales
    ServiciosModule,
    CalendarioModule,
    HistorialModule,
    ReservasModule,

    // 🔹 Cliente RabbitMQ para microservicio de notificaciones
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'notificaciones_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
})
export class AppModule {}

