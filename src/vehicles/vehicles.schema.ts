import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/users.schema';

export enum VehicleType {
  Car = 'car',
  Moto = 'moto',
  Truck = 'truck',
  Boat = 'boat',
  Van = 'van',
  SUV = 'suv',
  Other = 'other',
}

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ enum: VehicleType, required: true })
  type: VehicleType;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop()
  vin?: string;

  @Prop()
  licensePlate?: string;

  @Prop()
  comments?: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
