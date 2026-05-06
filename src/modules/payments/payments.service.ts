import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import {
  Payment,
  PaymentDocument,
} from '../../database/schemas/payments.schema';
import {
  Booking,
  BookingDocument,
  BookingStatus,
} from '../../database/schemas/booking.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async processPayment(dto: ProcessPaymentDto) {
    const booking = await this.bookingModel.findById(dto.bookingId);

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Оплата можлива лише для бронювання зі статусом "очікує оплату" (pending)');
    }

    const payment = await this.paymentModel.create({
      bookingId: new Types.ObjectId(dto.bookingId),
      amount: booking.totalPrice,
      currency: dto.currency.toUpperCase(),
      status: 'paid',
      method: dto.method,
    });

    booking.status = BookingStatus.CONFIRMED;
    await booking.save();

    return {
      payment,
      booking: await booking.populate(['guestId', 'roomId']),
      message: 'Оплату успішно проведено. Бронювання підтверджено.',
    };
  }

  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    return this.paymentModel.find().populate('bookingId').lean();
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findById(id).populate('bookingId').lean();

    if (!payment) {
      throw new NotFoundException('Платіж не знайдено');
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByIdAndUpdate(
      id,
      updatePaymentDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!payment) {
      throw new NotFoundException('Платіж не знайдено');
    }

    return payment;
  }

  async remove(id: string) {
    const payment = await this.paymentModel.findByIdAndDelete(id);

    if (!payment) {
      throw new NotFoundException('Платіж не знайдено');
    }

    return {
      success: true,
      message: 'Платіж успішно видалено',
    };
  }
}
