import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  HotelService,
  HotelServiceDocument,
} from '../../database/schemas/hotel-service.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(HotelService.name)
    private readonly hotelServiceModel: Model<HotelServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.hotelServiceModel.create(createServiceDto);
  }

  async findAll() {
    return this.hotelServiceModel.find().lean();
  }

  async findOne(id: string) {
    const service = await this.hotelServiceModel.findById(id).lean();

    if (!service) {
      throw new NotFoundException('Послугу не знайдено');
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.hotelServiceModel.findByIdAndUpdate(
      id,
      updateServiceDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!service) {
      throw new NotFoundException('Послугу не знайдено');
    }

    return service;
  }

  async remove(id: string) {
    const service = await this.hotelServiceModel.findByIdAndDelete(id);

    if (!service) {
      throw new NotFoundException('Послугу не знайдено');
    }

    return {
      success: true,
      message: 'Послугу успішно видалено',
    };
  }
}
