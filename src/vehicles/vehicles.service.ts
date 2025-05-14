import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { Vehicle, VehicleDocument } from './vehicles.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  create(data: CreateVehicleDto & { userId: string }) {
    return this.vehicleModel.create({ ...data });
  }

  async findAllForUser(userId: string) {
    return this.vehicleModel.find({ userId });
  }

  async findOne(id: string, userId: string) {
    const vehicle = await this.vehicleModel.findOne({ _id: id, userId });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async update(id: string, userId: string, dto: UpdateVehicleDto) {
    const updated = await this.vehicleModel.findOneAndUpdate(
      { _id: id, userId },
      dto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Vehicle not found');
    return updated;
  }

  async remove(id: string, userId: string) {
    const deleted = await this.vehicleModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deleted) throw new NotFoundException('Vehicle not found');
    return { message: 'Vehicle deleted' };
  }
}
