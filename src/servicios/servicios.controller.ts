import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  UsePipes, 
  ValidationPipe, 
  BadRequestException 
} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { ModalidadGuarderia } from './dto/modalidad-guarderia.dto';
import { TipoPaseo } from './dto/modalidad-paseo.dto';
import { TipoPeluqueria } from './dto/modalidad-peluqueria.dto';
import { TipoVeterinaria } from './dto/modalidad-veterinaria.dto';

@Controller('servicios/:type')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  // 🔹 Devuelve el DTO correspondiente al tipo de servicio
  private getDto(type: string) {
    switch (type.toLowerCase()) {
      case 'guarderia':
        return ModalidadGuarderia;
      case 'paseo':
        return TipoPaseo;
      case 'peluqueria':
        return TipoPeluqueria;
      case 'veterinaria':
        return TipoVeterinaria;
      default:
        return CreateServicioDto;
    }
  }

  @Get()
  findAll(@Param('type') type: string) {
    return this.serviciosService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    return this.serviciosService.findOne(type, id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Param('type') type: string, @Body() body: any) {
    const DtoClass = this.getDto(type);
    if (!DtoClass) {
      throw new BadRequestException(`Tipo de servicio no válido: ${type}`);
    }

    // 🔸 Ya no instanciamos con "new DtoClass()"
    const data = { ...body };

    return this.serviciosService.create(type, data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('type') type: string, @Param('id') id: string, @Body() body: any) {
    const DtoClass = this.getDto(type);
    if (!DtoClass) {
      throw new BadRequestException(`Tipo de servicio no válido: ${type}`);
    }

    const data = { ...body };

    return this.serviciosService.update(type, id, data);
  }

  @Delete(':id')
  remove(@Param('type') type: string, @Param('id') id: string) {
    return this.serviciosService.remove(type, id);
  }
}

