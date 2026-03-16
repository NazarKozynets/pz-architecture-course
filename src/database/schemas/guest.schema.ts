import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuestDocument = HydratedDocument<Guest>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Guest {
  @Prop({
    required: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    trim: true,
  })
  phone?: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);