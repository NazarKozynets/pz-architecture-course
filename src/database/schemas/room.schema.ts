import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Room {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    min: 1,
  })
  price: number;

  @Prop({
    required: true,
    min: 1,
  })
  capacity: number;

  @Prop({
    trim: true,
  })
  description?: string;

  @Prop({
    required: true,
    enum: ['available', 'occupied', 'maintenance'],
    default: 'available',
  })
  status: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
