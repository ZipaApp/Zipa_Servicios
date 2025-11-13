import { CreateServicioDto } from './create-servicio.dto';
import { IsEnum, IsOptional, IsBoolean, IsArray, IsString } from 'class-validator';

export enum TipoPeluqueria {
  BAÑO = 'baño',
  CORTE = 'corte',
  BAÑO_CORTE = 'baño y corte',
  DESLANADO = 'deslanado',
}

export class CreatePeluqueriaServicioDto extends CreateServicioDto {
  @IsEnum(TipoPeluqueria)
  tipo: TipoPeluqueria;

  @IsOptional()
  @IsBoolean()
  incluyeTransporte?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productosUsados?: string[];
}

