import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest, GuestDocument } from '../../database/schemas/guest.schema';

@Injectable()
export class GuestsService {
  constructor(
    @InjectModel(Guest.name)
    private readonly guestModel: Model<GuestDocument>,
  ) {}

  async create(createGuestDto: CreateGuestDto) {
    return this.guestModel.create(createGuestDto);
  }

  async findAll() {
    return this.guestModel.find().lean();
  }

  async findOne(id: string) {
    const guest = await this.guestModel.findById(id).lean();

    if (!guest) {
      throw new NotFoundException('Гостя не знайдено');
    }

    return guest;
  }

  async update(id: string, updateGuestDto: UpdateGuestDto) {
    const guest = await this.guestModel.findByIdAndUpdate(id, updateGuestDto, {
      new: true,
      runValidators: true,
    });

    if (!guest) {
      throw new NotFoundException('Гостя не знайдено');
    }

    return guest;
  }

  async remove(id: string) {
    const guest = await this.guestModel.findByIdAndDelete(id);

    if (!guest) {
      throw new NotFoundException('Гостя не знайдено');
    }

    return {
      success: true,
      message: 'Гостя успішно видалено',
    };
  }
}
