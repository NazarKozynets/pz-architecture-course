import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Booking {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  guestId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
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
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop({
    min: 0,
  })
  totalPrice?: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);