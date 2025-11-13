import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserva, ReservaSchema } from './schemas/reserva.schema';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

// 🧩 Dependencias internas
import { CalendarioModule } from '../calendario/calendario.module';
import { HistorialModule } from '../historial/historial.module';

// 📨 Comunicación por eventos (RabbitMQ)
import { RabbitMQModule } from '../infra/messaging/rabbitmq.module';

@Module({
  imports: [
    // Modelo de MongoDB
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),

    // Módulos locales
    CalendarioModule,   // 👉 necesario para actualizar disponibilidad
    HistorialModule,    // 👉 para registrar acciones en el historial

    // Módulo de mensajería (RabbitMQ)
    RabbitMQModule,     // 👉 para emitir eventos de notificación
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}

