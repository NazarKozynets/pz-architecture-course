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

import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { RoomResponseDto, RoomsListResponseDto } from './dto/room-response.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити новий номер' })
  @ApiBody({
    type: CreateRoomDto,
    description: 'Дані для створення номера',
  })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Номер успішно створено',
    successType: RoomResponseDto,
    badRequestMessage: 'Некоректні дані для створення номера',
    conflictMessage: 'Номер з такими даними вже існує',
  })
  create(@Body() dto: CreateRoomDto) {
    return this.roomsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх номерів' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список номерів успішно отримано',
    successType: RoomsListResponseDto,
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати номер за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId номера',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Номер успішно знайдено',
    badRequestMessage: 'Некоректний ID номера',
    notFoundMessage: 'Номер не знайдено',
    successType: RoomResponseDto,
  })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити номер за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId номера',
  })
  @ApiBody({
    type: UpdateRoomDto,
    description: 'Дані для оновлення номера',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Номер успішно оновлено',
    badRequestMessage: 'Некоректні дані для оновлення номера',
    notFoundMessage: 'Номер не знайдено',
    conflictMessage: 'Конфлікт при оновленні номера',
    successType: RoomResponseDto,
  })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити номер за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId номера',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Номер успішно видалено',
    badRequestMessage: 'Некоректний ID номера',
    notFoundMessage: 'Номер не знайдено',
  })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.roomsService.remove(id);
  }
}