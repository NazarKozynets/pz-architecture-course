import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from '../../database/schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.roomModel.create(createRoomDto);
  }

  async findAll() {
    return this.roomModel.find().lean();
  }

  async findOne(id: string) {
    const room = await this.roomModel.findById(id).lean();

    if (!room) {
      throw new NotFoundException('Кімнату не знайдено');
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomModel.findByIdAndUpdate(id, updateRoomDto, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      throw new NotFoundException('Кімнату не знайдено');
    }

    return room;
  }

  async remove(id: string) {
    const room = await this.roomModel.findByIdAndDelete(id);

    if (!room) {
      throw new NotFoundException('Кімнату не знайдено');
    }

    return {
      success: true,
      message: 'Кімнату успішно видалено',
    };
  }
}
