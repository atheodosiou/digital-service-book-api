import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/users.schema';

export type ServiceTypeDocument = ServiceType & Document;

@Schema({ timestamps: true })
export class ServiceType {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId?: Types.ObjectId; // Null if global default type

  @Prop({ default: false })
  isDefault: boolean;

  @Prop()
  description?: string;

  @Prop()
  recurrenceKm?: number; // E.g. 5000 km

  @Prop()
  recurrenceMonths?: number; // E.g. 6 months
}

export const ServiceTypeSchema = SchemaFactory.createForClass(ServiceType);
