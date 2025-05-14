import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceTypeDto {
  @ApiProperty({ example: 'Oil Change' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Change oil and filter every 5,000 km',
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 5000, required: false })
  @IsOptional()
  @IsNumber()
  recurrenceKm?: number;

  @ApiProperty({ example: 6, required: false })
  @IsOptional()
  @IsNumber()
  recurrenceMonths?: number;
}
