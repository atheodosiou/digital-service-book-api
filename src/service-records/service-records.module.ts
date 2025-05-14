import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceRecord, ServiceRecordSchema } from './service-records.schema';
import { ServiceRecordsService } from './service-records.service';
import { ServiceRecordsController } from './service-records.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceRecord.name, schema: ServiceRecordSchema },
    ]),
  ],
  controllers: [ServiceRecordsController],
  providers: [ServiceRecordsService],
  exports: [ServiceRecordsService],
})
export class ServiceRecordsModule {}
