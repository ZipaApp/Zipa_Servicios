import { Controller, Get, Post, Put, Delete, Param, Body, Logger } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reservas')
export class ReservasController {
  private readonly logger = new Logger(ReservasController.name);

  constructor(private readonly reservasService: ReservasService) {}

  // 🧾 Crear una nueva reserva
  @Post()
  async crear(@Body() data: CreateReservaDto) {
    this.logger.log('📩 Creando nueva reserva...');
    return this.reservasService.crearReserva(data);
  }

  // 📋 Obtener todas las reservas
  @Get()
  async obtenerTodas() {
    return this.reservasService.obtenerReservas();
  }

  // 🐶 Obtener reservas por mascota
  @Get('mascota/:mascotaId')
  async obtenerPorMascota(@Param('mascotaId') mascotaId: string) {
    return this.reservasService.obtenerPorMascota(mascotaId);
  }

  // 🔄 Actualizar estado de la reserva
  @Put(':id/estado')
  async actualizarEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.reservasService.actualizarEstado(id, estado);
  }

  // ❌ Cancelar reserva
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.reservasService.cancelarReserva(id);
  }
}

