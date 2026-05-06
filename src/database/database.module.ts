import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payments.schema';
import { Room, RoomSchema } from './schemas/room.schema';
import { Guest, GuestSchema } from './schemas/guest.schema';
import {
  HotelService,
  HotelServiceSchema,
} from './schemas/hotel-service.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { User, UserSchema } from './schemas/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Guest.name, schema: GuestSchema },
      { name: HotelService.name, schema: HotelServiceSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}