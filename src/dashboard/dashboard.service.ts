import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ServiceRecord,
  ServiceRecordDocument,
} from 'src/service-records/service-records.schema';
import {
  ServiceType,
  ServiceTypeDocument,
} from 'src/service-types/service-types.schema';
import { Vehicle, VehicleDocument } from 'src/vehicles/vehicles.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(ServiceRecord.name)
    private serviceRecordModel: Model<ServiceRecordDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(ServiceType.name)
    private serviceTypeModel: Model<ServiceTypeDocument>,
  ) {}

  async getDashboardData(userId: string) {
    const objectUserId = new Types.ObjectId(userId);

    const vehicles = await this.vehicleModel
      .find({ userId: objectUserId })
      .lean();

    const servicesPerVehicle = await this.serviceRecordModel.aggregate([
      { $match: { userId: objectUserId } },
      {
        $group: {
          _id: '$vehicleId',
          total: { $sum: 1 },
        },
      },
    ]);

    const costPerVehicle = await this.serviceRecordModel.aggregate([
      { $match: { userId: objectUserId } },
      {
        $group: {
          _id: '$vehicleId',
          totalSpent: { $sum: '$cost' },
        },
      },
    ]);

    const topServices = await this.serviceRecordModel.aggregate([
      { $match: { userId: objectUserId } },
      {
        $group: {
          _id: '$serviceTypeId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const recentServices = await this.serviceRecordModel
      .find({ userId: objectUserId })
      .sort({ serviceDate: -1 })
      .limit(5)
      .populate('vehicleId')
      .populate('serviceTypeId')
      .lean();

    return {
      vehicles,
      servicesPerVehicle,
      costPerVehicle,
      topServices,
      recentServices,
    };
  }
}
