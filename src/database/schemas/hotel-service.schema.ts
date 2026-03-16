import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelServiceDocument = HydratedDocument<HotelService>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class HotelService {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    trim: true,
  })
  description?: string;

  @Prop({
    required: true,
    min: 0,
  })
  price: number;
}

export const HotelServiceSchema = SchemaFactory.createForClass(HotelService);