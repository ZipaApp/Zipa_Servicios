import {
  IsString,
  IsDateString,
  IsOptional,
  IsIn,
  IsMongoId,
} from 'class-validator';

export class CreateReservaDto {
  @IsString()
  mascotaId: string;

  @IsString()
  nombreMascota: string;

  @IsMongoId()
  servicioId: string; // referencia al servicio base

  @IsMongoId()
  calendarioId: string; // referencia al slot del calendario reservado

  @IsDateString()
  fecha: string; // formato ISO, ej: '2025-11-12T10:00:00.000Z'

  @IsString()
  horaInicio: string; // '10:00'

  @IsString()
  horaFin: string; // '11:00'

  @IsOptional()
  @IsIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
  estado?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

