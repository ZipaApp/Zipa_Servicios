import { CreateServicioDto } from './create-servicio.dto';
import { IsEnum, IsOptional, IsBoolean, IsString } from 'class-validator';

export enum TipoVeterinaria {
  CONSULTA = 'consulta general',
  VACUNACION = 'vacunación',
  DESPARASITACION = 'desparasitación',
  CONTROL = 'control',
}

export class CreateVeterinariaServicioDto extends CreateServicioDto {
  @IsEnum(TipoVeterinaria)
  tipo: TipoVeterinaria;

  @IsOptional()
  @IsString()
  veterinario?: string;

  @IsOptional()
  @IsBoolean()
  requiereAyuno?: boolean;
}

