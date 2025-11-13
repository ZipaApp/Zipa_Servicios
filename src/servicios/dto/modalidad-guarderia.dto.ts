import { CreateServicioDto } from './create-servicio.dto';
import { IsEnum, IsOptional, IsBoolean } from 'class-validator';

export enum ModalidadGuarderia {
  MEDIO_DIA = 'medio día',
  DIA_COMPLETO = 'día completo',
  NOCHE = 'noche',
}

export class CreateGuarderiaServicioDto extends CreateServicioDto {
  @IsEnum(ModalidadGuarderia)
  modalidad: ModalidadGuarderia;

  @IsOptional()
  @IsBoolean()
  incluyeAlimentacion?: boolean;
}

