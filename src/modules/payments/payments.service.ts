import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  Payment,
  PaymentDocument,
} from '../../database/schemas/payments.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    return this.paymentModel.find().lean();
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findById(id).lean();

    if (!payment) {
      throw new NotFoundException('Платіж не знайдено');
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const room = await this.paymentModel.findByIdAndUpdate(
      id,
      updatePaymentDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!room) {
      throw new NotFoundException('Платіж не знайдено');
    }

    return room;
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
