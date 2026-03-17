import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import {
  BookingListResponseDto,
  BookingResponseDto,
} from './dto/response-booking.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити нове бронювання' })
  @ApiBody({
    type: CreateBookingDto,
    description: 'Дані для створення бронювання',
  })
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

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх бронювань' })
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
  @ApiBody({
    type: UpdateBookingDto,
    description: 'Дані для оновлення бронювання',
  })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити бронювання за ID' })
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
