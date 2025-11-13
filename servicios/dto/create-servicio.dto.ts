import { IsString, IsNumber, IsOptional, IsBoolean, MaxLength, Min } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(1)
  duracion: number; // minutos

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

