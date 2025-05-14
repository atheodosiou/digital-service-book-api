import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceRecordDto {
  @ApiProperty({ example: '663c20e3a18d9c8aef4ed2a1' })
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: '663c20e3a18d9c8aef4ed2b2' })
  @IsNotEmpty()
  serviceTypeId: string;

  @ApiProperty({ example: '2025-05-14' })
  @IsNotEmpty()
  @IsDateString()
  serviceDate: string;

  @ApiProperty({ example: 15000 })
  @IsNotEmpty()
  @IsNumber()
  mileageAtService: number;

  @ApiProperty({ example: 'AutoFix Garage', required: false })
  @IsOptional()
  @IsString()
  serviceCenter?: string;

  @ApiProperty({ example: 120.5, required: false })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiProperty({
    example: 'Changed oil, filter, and checked brakes',
    required: false,
  })
  @IsOptional()
  @IsString()
  comments?: string;
}
