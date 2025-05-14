import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ServiceType } from 'src/service-types/service-types.schema';
import { User } from 'src/users/users.schema';
import { Vehicle } from 'src/vehicles/vehicles.schema';

export type ServiceRecordDocument = ServiceRecord & Document;

@Schema({ timestamps: true })
export class ServiceRecord {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Vehicle.name, required: true })
  vehicleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ServiceType.name, required: true })
  serviceTypeId: Types.ObjectId;

  @Prop({ required: true })
  serviceDate: Date;

  @Prop({ required: true })
  mileageAtService: number;

  @Prop()
  serviceCenter?: string;

  @Prop()
  cost?: number;

  @Prop()
  comments?: string;
}

export const ServiceRecordSchema = SchemaFactory.createForClass(ServiceRecord);
