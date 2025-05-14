import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceRecord,
  ServiceRecordSchema,
} from 'src/service-records/service-records.schema';
import {
  ServiceType,
  ServiceTypeSchema,
} from 'src/service-types/service-types.schema';
import { Vehicle, VehicleSchema } from 'src/vehicles/vehicles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceRecord.name, schema: ServiceRecordSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: ServiceType.name, schema: ServiceTypeSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
