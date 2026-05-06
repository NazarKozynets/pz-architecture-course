import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Booking {
  @Prop({
    type: Types.ObjectId,
    ref: 'Guest',
    required: true,
  })
  guestId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  roomId: Types.ObjectId;

  @Prop({
    required: true,
  })
  checkInDate: Date;

  @Prop({
    required: true,
  })
  checkOutDate: Date;

  @Prop({
    required: true,
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: string;

  @Prop({
    min: 0,
    default: 0,
  })
  totalPrice: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'HotelService' }],
    default: [],
  })
  services: Types.ObjectId[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);