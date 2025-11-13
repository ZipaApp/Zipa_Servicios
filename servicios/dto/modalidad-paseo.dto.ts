import { CreateServicioDto } from './create-servicio.dto';
import { IsEnum, IsOptional, IsNumber, Min, IsString } from 'class-validator';

export enum TipoPaseo {
  INDIVIDUAL = 'individual',
  GRUPAL = 'grupal',
}

export class CreatePaseoServicioDto extends CreateServicioDto {
  @IsEnum(TipoPaseo)
  tipoPaseo: TipoPaseo;

  @IsNumber()
  @Min(1)
  duracionPaseo: number;

  @IsOptional()
  @IsString()
  zona?: string;
}

