import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  mascotaId: string;

  @IsString()
  servicioTipo: string; // debe coincidir con los tipos del catálogo

  @IsString()
  servicioId: string;

  @IsDateString()
  fecha: string; // se valida como ISO date

  @IsOptional()
  @IsIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
  estado?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}

