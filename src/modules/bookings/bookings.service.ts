import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookRoomDto } from './dto/book-room.dto';
import { AddServiceDto } from './dto/add-service.dto';
import {
  Booking,
  BookingDocument,
  BookingStatus,
} from '../../database/schemas/booking.schema';
import { Room, RoomDocument } from '../../database/schemas/room.schema';
import { Guest, GuestDocument } from '../../database/schemas/guest.schema';
import {
  HotelService,
  HotelServiceDocument,
} from '../../database/schemas/hotel-service.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
    @InjectModel(Guest.name)
    private readonly guestModel: Model<GuestDocument>,
    @InjectModel(HotelService.name)
    private readonly hotelServiceModel: Model<HotelServiceDocument>,
  ) {}

  async bookRoom(dto: BookRoomDto) {
    const guest = await this.guestModel.findById(dto.guestId).lean();
    if (!guest) {
      throw new NotFoundException('Гостя не знайдено');
    }

    const room = await this.roomModel.findById(dto.roomId).lean();
    if (!room) {
      throw new NotFoundException('Номер не знайдено');
    }

    if (room.status !== 'available') {
      throw new BadRequestException('Номер недоступний для бронювання');
    }

    const checkIn = new Date(dto.checkInDate);
    const checkOut = new Date(dto.checkOutDate);

    if (checkOut <= checkIn) {
      throw new BadRequestException('Дата виїзду має бути пізніше дати заїзду');
    }

    const overlapping = await this.bookingModel.findOne({
      roomId: new Types.ObjectId(dto.roomId),
      status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
      $or: [
        { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } },
      ],
    });

    if (overlapping) {
      throw new BadRequestException('Номер вже заброньований на ці дати');
    }

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    const booking = await this.bookingModel.create({
      guestId: new Types.ObjectId(dto.guestId),
      roomId: new Types.ObjectId(dto.roomId),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      status: BookingStatus.PENDING,
      totalPrice,
      services: [],
    });

    return booking.populate(['guestId', 'roomId']);
  }

  async addServiceToBooking(bookingId: string, dto: AddServiceDto) {
    const booking = await this.bookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    if (![BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN].includes(booking.status as BookingStatus)) {
      throw new BadRequestException('Послуги можна замовити лише для підтвердженого або активного бронювання');
    }

    const service = await this.hotelServiceModel.findById(dto.serviceId).lean();
    if (!service) {
      throw new NotFoundException('Послугу не знайдено');
    }

    booking.services.push(new Types.ObjectId(dto.serviceId));
    booking.totalPrice += service.price;
    await booking.save();

    return booking.populate(['guestId', 'roomId', 'services']);
  }

  async checkIn(bookingId: string) {
    const booking = await this.bookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException('Заселення можливе лише для підтвердженого бронювання (статус: confirmed)');
    }

    await this.roomModel.findByIdAndUpdate(booking.roomId, { status: 'occupied' });

    booking.status = BookingStatus.CHECKED_IN;
    await booking.save();

    return booking.populate(['guestId', 'roomId']);
  }

  async checkOut(bookingId: string) {
    const booking = await this.bookingModel
      .findById(bookingId)
      .populate('guestId')
      .populate('roomId')
      .populate('services');

    if (!booking) {
      throw new NotFoundException('Бронювання не знайдено');
    }

    if (booking.status !== BookingStatus.CHECKED_IN) {
      throw new BadRequestException('Виселення можливе лише для активного бронювання (статус: checked_in)');
    }

    await this.roomModel.findByIdAndUpdate(booking.roomId, { status: 'available' });

    booking.status = BookingStatus.COMPLETED;
    await booking.save();

    return {
      booking,
      bill: {
        totalAmount: booking.totalPrice,
        currency: 'UAH',
        generatedAt: new Date().toISOString(),
      },
    };
  }

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
      .populate('services')
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
