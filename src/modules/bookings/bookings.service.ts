import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  Booking,
  BookingDocument,
} from '../../database/schemas/booking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    return this.bookingModel.create({
      ...createBookingDto,
      guestId: new Types.ObjectId(createBookingDto.guestId),
      roomId: new Types.ObjectId(createBookingDto.roomId),
    });
  }

  async findAll() {
    return this.bookingModel
      .find()
      .populate('guestId')
      .populate('roomId')
      .lean();
  }

  async findOne(id: string) {
    const booking = await this.bookingModel
      .findById(id)
      .populate('guestId')
      .populate('roomId')
      .lean();

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      updateBookingDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    return booking;
  }

  async remove(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id);

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    return {
      success: true,
      message: 'Бронювання успішно видалено',
    };
  }
}
