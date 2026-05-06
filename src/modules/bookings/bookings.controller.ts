import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookRoomDto } from './dto/book-room.dto';
import { AddServiceDto } from './dto/add-service.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import {
  BookingListResponseDto,
  BookingResponseDto,
} from './dto/response-booking.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../database/schemas/user.schema';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('book')
  @ApiOperation({ summary: 'Сценарій 1: Бронювання номера з перевіркою доступності та розрахунком ціни' })
  @ApiBody({ type: BookRoomDto })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Бронювання успішно створено',
    badRequestMessage: 'Номер недоступний або некоректні дати',
    notFoundMessage: 'Гостя або номер не знайдено',
    successType: BookingResponseDto,
  })
  bookRoom(@Body() dto: BookRoomDto) {
    return this.bookingsService.bookRoom(dto);
  }

  @Post(':id/services')
  @ApiOperation({ summary: 'Сценарій 3: Замовлення додаткової послуги до бронювання' })
  @ApiParam({ name: 'id', type: String, description: 'ID бронювання' })
  @ApiBody({ type: AddServiceDto })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Послугу успішно додано до бронювання',
    badRequestMessage: 'Послугу можна замовити лише для підтвердженого бронювання',
    notFoundMessage: 'Бронювання або послугу не знайдено',
    successType: BookingResponseDto,
  })
  addService(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: AddServiceDto,
  ) {
    return this.bookingsService.addServiceToBooking(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/checkin')
  @ApiOperation({ summary: 'Сценарій 4: Заселення гостя (тільки адміністратор)' })
  @ApiParam({ name: 'id', type: String, description: 'ID бронювання' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Гостя успішно заселено',
    badRequestMessage: 'Заселення можливе лише для підтвердженого бронювання',
    notFoundMessage: 'Бронювання не знайдено',
    successType: BookingResponseDto,
  })
  checkIn(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingsService.checkIn(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post(':id/checkout')
  @ApiOperation({ summary: 'Сценарій 5: Виселення гостя та формування фінального рахунку (тільки адміністратор)' })
  @ApiParam({ name: 'id', type: String, description: 'ID бронювання' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Гостя успішно виселено, рахунок сформовано',
    badRequestMessage: 'Виселення можливе лише для активного бронювання',
    notFoundMessage: 'Бронювання не знайдено',
  })
  checkOut(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingsService.checkOut(id);
  }

  @Post()
  @ApiOperation({ summary: 'Створити бронювання вручну' })
  @ApiBody({ type: CreateBookingDto })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Бронювання успішно створено',
    badRequestMessage: 'Некоректні дані для створення бронювання',
    conflictMessage: 'Конфлікт при створенні бронювання',
    successType: BookingResponseDto,
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Отримати список усіх бронювань (тільки адміністратор)' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список бронювань успішно отримано',
    successType: BookingListResponseDto,
  })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати бронювання за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId бронювання',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Бронювання успішно знайдено',
    badRequestMessage: 'Некоректний ID бронювання',
    notFoundMessage: 'Бронювання не знайдено',
    successType: BookingResponseDto,
  })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити бронювання за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId бронювання',
  })
  @ApiBody({ type: UpdateBookingDto })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Бронювання успішно оновлено',
    badRequestMessage: 'Некоректні дані для оновлення бронювання',
    notFoundMessage: 'Бронювання не знайдено',
    conflictMessage: 'Конфлікт при оновленні бронювання',
    successType: BookingResponseDto,
  })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Видалити бронювання за ID (тільки адміністратор)' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId бронювання',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Бронювання успішно видалено',
    badRequestMessage: 'Некоректний ID бронювання',
    notFoundMessage: 'Бронювання не знайдено',
  })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingsService.remove(id);
  }
}
