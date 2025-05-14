import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota' })
  @IsNotEmpty()
  make: string;

  @ApiProperty({ example: 'Corolla' })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2021 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'JH4KA2650MC000000', required: false })
  @IsOptional()
  @IsString()
  vin?: string;

  @ApiProperty({ example: 'XYZ-1234', required: false })
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ApiProperty({ example: 15000, required: false })
  @IsOptional()
  @IsNumber()
  currentMileage?: number;

  @ApiProperty({ example: 'Main city vehicle', required: false })
  @IsOptional()
  @IsString()
  comments?: string;
}
