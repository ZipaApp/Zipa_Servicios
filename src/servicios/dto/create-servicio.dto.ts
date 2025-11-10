import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration: number;

  @IsString()
  assignedTo: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

