import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from '../bookings/bookings.module';
import { GuestsModule } from '../guests/guests.module';
import { PaymentsModule } from '../payments/payments.module';
import { RoomsModule } from '../rooms/rooms.module';
import { ServicesModule } from '../services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    BookingsModule,
    GuestsModule,
    PaymentsModule,
    RoomsModule,
    ServicesModule,
    MongooseModule.forRoot(
      'mongodb+srv://developer:tid7MMmItde1N7FH@cluster0.m1os7.mongodb.net',
    ),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
