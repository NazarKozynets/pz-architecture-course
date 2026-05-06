import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { RoomResponseDto, RoomsListResponseDto } from './dto/room-response.dto';
import { Public } from '../../common/decorators/public.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../database/schemas/user.schema';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Створити новий номер (тільки адміністратор)' })
  @ApiBody({ type: CreateRoomDto })
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

  @Public()
  @UseInterceptors(CacheInterceptor)
  @Get()
  @ApiOperation({ summary: 'Отримати список усіх номерів (публічний, з кешуванням)' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список номерів успішно отримано',
    successType: RoomsListResponseDto,
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Отримати номер за ID (публічний)' })
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

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Оновити номер за ID (тільки адміністратор)' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId номера',
  })
  @ApiBody({ type: UpdateRoomDto })
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

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Видалити номер за ID (тільки адміністратор)' })
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
