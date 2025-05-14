import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceRecordDto } from './dtos/create-service-record.dto';
import { UpdateServiceRecordDto } from './dtos/update-service-record.dto';
import { ServiceRecord, ServiceRecordDocument } from './service-records.schema';

@Injectable()
export class ServiceRecordsService {
  constructor(
    @InjectModel(ServiceRecord.name)
    private recordModel: Model<ServiceRecordDocument>,
  ) {}

  create(data: CreateServiceRecordDto & { userId: string }) {
    return this.recordModel.create(data);
  }

  findAllForVehicle(vehicleId: string, userId: string) {
    return this.recordModel
      .find({ vehicleId, userId })
      .populate('serviceTypeId');
  }

  async findOne(id: string, userId: string) {
    const record = await this.recordModel
      .findOne({ _id: id, userId })
      .populate('serviceTypeId');
    if (!record) throw new NotFoundException('Service record not found');
    return record;
  }

  async update(id: string, userId: string, dto: UpdateServiceRecordDto) {
    const updated = await this.recordModel.findOneAndUpdate(
      { _id: id, userId },
      dto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Service record not found');
    return updated;
  }

  async remove(id: string, userId: string) {
    const deleted = await this.recordModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deleted) throw new NotFoundException('Service record not found');
    return { message: 'Service record deleted' };
  }
}
