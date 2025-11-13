import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CalendarioService } from './calendario.service';

@Controller('calendario')
export class CalendarioController {
  private readonly logger = new Logger(CalendarioController.name);

  constructor(private readonly calendarioService: CalendarioService) {}

  // =====================================================
  // 🧩 Crear nueva franja de disponibilidad
  // =====================================================
  @Post()
  async crear(@Body() data: any) {
    this.logger.log('🗓️ Creando nueva franja de disponibilidad...');
    try {
      return await this.calendarioService.crearDisponibilidad(data);
    } catch (err) {
      this.logger.error('❌ Error al crear franja:', err.message);
      throw new BadRequestException(err.message);
    }
  }

  // =====================================================
  // 📅 Obtener disponibilidad por servicio y fecha
  // =====================================================
  @Get(':servicioId')
  async obtener(
    @Param('servicioId') servicioId: string,
    @Query('fecha') fecha?: string,
  ) {
    this.logger.log(`📋 Consultando disponibilidad para servicio ${servicioId}`);
    return this.calendarioService.obtenerDisponibilidad(servicioId, fecha);
  }

  // =====================================================
  // 🔄 Actualizar disponibilidad o asignar reserva
  // =====================================================
  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() data: any) {
    this.logger.log(`🆙 Actualizando franja ${id}`);
    return this.calendarioService.actualizarDisponibilidad(id, data);
  }

  // =====================================================
  // 🔓 Liberar franja manualmente (opcional)
  // =====================================================
  @Put(':id/liberar')
  async liberar(@Param('id') id: string) {
    this.logger.log(`🔓 Liberando franja ${id}`);
    return this.calendarioService.liberarFranja(id);
  }

  // =====================================================
  // ❌ Eliminar franja del calendario
  // =====================================================
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    this.logger.log(`🗑️ Eliminando franja ${id}`);
    return this.calendarioService.eliminarDisponibilidad(id);
  }
}

