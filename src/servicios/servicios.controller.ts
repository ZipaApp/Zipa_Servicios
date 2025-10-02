import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServiciosService } from './servicios.service';

@Controller('servicios/:type')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  findAll(@Param('type') type: string) {
    return this.serviciosService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    return this.serviciosService.findOne(type, id);
  }

  @Post()
  create(@Param('type') type: string, @Body() data: any) {
    return this.serviciosService.create(type, data);
  }

  @Put(':id')
  update(@Param('type') type: string, @Param('id') id: string, @Body() data: any) {
    return this.serviciosService.update(type, id, data);
  }

  @Delete(':id')
  remove(@Param('type') type: string, @Param('id') id: string) {
    return this.serviciosService.remove(type, id);
  }
}

