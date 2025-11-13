import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HistorialService } from './historial.service';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  // =====================================================
  // 🆕 Crear nuevo historial (usado desde Reservas o manualmente)
  // =====================================================
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() data: any) {
    return this.historialService.crearHistorial(data);
  }

  // =====================================================
  // 📋 Listar todos los historiales
  // =====================================================
  @Get()
  async listarTodos() {
    return this.historialService.listarTodos();
  }

  // =====================================================
  // 🔍 Obtener historial por mascota
  // =====================================================
  @Get(':mascotaId')
  async obtenerPorMascota(@Param('mascotaId') mascotaId: string) {
    return this.historialService.obtenerHistorialPorMascota(mascotaId);
  }

  // =====================================================
  // ✏️ Actualizar registro existente
  // =====================================================
  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() data: any) {
    return this.historialService.actualizarRegistro(id, data);
  }

  // =====================================================
  // ❌ Eliminar registro del historial
  // =====================================================
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.historialService.eliminarRegistro(id);
    return { message: `Historial ${id} eliminado correctamente` };
  }
}

