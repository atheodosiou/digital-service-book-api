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
    const objectUserId = Types.ObjectId.isValid(userId)
      ? new Types.ObjectId(userId)
      : userId;

    const userMatch = { $in: [userId, objectUserId] };

    // 🚗 All vehicles owned by user
    const vehicles = await this.vehicleModel.find({ userId: userMatch }).lean();

    // 🛠 Total service records per vehicle
    const servicesPerVehicle = await this.serviceRecordModel.aggregate([
      { $match: { userId: userMatch } },
      {
        $group: {
          _id: '$vehicleId',
          total: { $sum: 1 },
        },
      },
    ]);

    // 💰 Total cost of service per vehicle
    const costPerVehicle = await this.serviceRecordModel.aggregate([
      { $match: { userId: userMatch } },
      {
        $group: {
          _id: '$vehicleId',
          totalSpent: { $sum: '$cost' },
        },
      },
    ]);

    // 🏆 Top service types used
    const topServices = await this.serviceRecordModel.aggregate([
      { $match: { userId: userMatch } },
      {
        $group: {
          _id: '$serviceTypeId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // 🕓 Latest service records (limit 5)
    const recentServices = await this.serviceRecordModel
      .find({ userId: userMatch })
      .sort({ serviceDate: -1 })
      .limit(5)
      .populate('vehicleId')
      .populate('serviceTypeId')
      .lean();

    // 📊 Count of vehicles per type
    const vehicleTypeCounts = await this.vehicleModel.aggregate([
      { $match: { userId: userMatch } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    // 🔧 Total services grouped by vehicle type
    const serviceCountByType = await this.serviceRecordModel.aggregate([
      { $match: { userId: userMatch } },
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      { $unwind: '$vehicle' },
      {
        $group: {
          _id: '$vehicle.type',
          total: { $sum: 1 },
        },
      },
    ]);

    // 💸 Total cost grouped by vehicle type
    const serviceCostByType = await this.serviceRecordModel.aggregate([
      { $match: { userId: userMatch } },
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      { $unwind: '$vehicle' },
      {
        $group: {
          _id: '$vehicle.type',
          totalSpent: { $sum: '$cost' },
        },
      },
    ]);

    return {
      vehicles,
      servicesPerVehicle,
      costPerVehicle,
      topServices,
      recentServices,
      vehicleTypeCounts,
      serviceCountByType,
      serviceCostByType,
    };
  }
}
