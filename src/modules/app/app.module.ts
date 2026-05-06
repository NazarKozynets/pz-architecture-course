import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from '../bookings/bookings.module';
import { GuestsModule } from '../guests/guests.module';
import { PaymentsModule } from '../payments/payments.module';
import { RoomsModule } from '../rooms/rooms.module';
import { ServicesModule } from '../services/services.module';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, ttl: 30000 }),
    MongooseModule.forRoot(
      'mongodb+srv://developer:tid7MMmItde1N7FH@cluster0.m1os7.mongodb.net',
    ),
    DatabaseModule,
    AuthModule,
    BookingsModule,
    GuestsModule,
    PaymentsModule,
    RoomsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
