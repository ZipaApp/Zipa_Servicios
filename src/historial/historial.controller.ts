import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HistorialService } from './historial.service';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  registrar(@Body() data: any) {
    return this.historialService.registrarServicio(data);
  }

  @Get()
  obtenerTodos() {
    return this.historialService.obtenerTodos();
  }

  @Get('mascota/:mascotaId')
  obtenerPorMascota(@Param('mascotaId') mascotaId: string) {
    return this.historialService.obtenerPorMascota(mascotaId);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: any) {
    return this.historialService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.historialService.eliminar(id);
  }
}

