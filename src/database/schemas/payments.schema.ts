import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Payment {
  @Prop({
    type: Types.ObjectId,
    ref: 'Booking',
    required: true,
  })
  bookingId: Types.ObjectId;

  @Prop({
    required: true,
    min: 1,
  })
  amount: number;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
  })
  currency: string;

  @Prop({
    required: true,
    trim: true,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  })
  status: string;

  @Prop({
    trim: true,
  })
  method?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
