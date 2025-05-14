import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { VehicleType } from '../vehicles.schema';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsOptional()
  @IsEnum(VehicleType)
  @ApiPropertyOptional({ enum: VehicleType, example: VehicleType.Car })
  type?: VehicleType;
}
