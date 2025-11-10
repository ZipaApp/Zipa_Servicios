import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CalendarioService } from './calendario.service';

@Controller('calendario')
export class CalendarioController {
  constructor(private readonly calendarioService: CalendarioService) {}

  @Post()
  crear(@Body() data: any) {
    return this.calendarioService.crearDisponibilidad(data);
  }

  @Get(':servicio')
  obtener(
    @Param('servicio') servicio: string,
    @Query('fecha') fecha?: string,
  ) {
    return this.calendarioService.obtenerDisponibilidad(servicio, fecha);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: any) {
    return this.calendarioService.actualizarDisponibilidad(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.calendarioService.eliminarDisponibilidad(id);
  }
}

