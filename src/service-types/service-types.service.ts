import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceTypeDto } from './dtos/create-service-type.dto';
import { UpdateServiceTypeDto } from './dtos/update-service-type.dto';
import { ServiceType, ServiceTypeDocument } from './service-types.schema';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectModel(ServiceType.name)
    private serviceTypeModel: Model<ServiceTypeDocument>,
  ) {}

  create(data: CreateServiceTypeDto & { userId: string }) {
    return this.serviceTypeModel.create({ ...data, isDefault: false });
  }

  findAll(userId: string) {
    return this.serviceTypeModel.find({
      $or: [{ userId }, { isDefault: true }],
    });
  }

  async findOne(id: string, userId: string) {
    const type = await this.serviceTypeModel.findOne({
      _id: id,
      $or: [{ userId }, { isDefault: true }],
    });
    if (!type) throw new NotFoundException('Service type not found');
    return type;
  }

  async update(id: string, userId: string, dto: UpdateServiceTypeDto) {
    const updated = await this.serviceTypeModel.findOneAndUpdate(
      { _id: id, userId },
      dto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Service type not found');
    return updated;
  }

  async remove(id: string, userId: string) {
    const deleted = await this.serviceTypeModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deleted) throw new NotFoundException('Service type not found');
    return { message: 'Service type deleted' };
  }
}
