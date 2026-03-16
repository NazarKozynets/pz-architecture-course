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

import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('guests')
@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити нового гостя' })
  @ApiBody({
    type: CreateGuestDto,
    description: 'Дані для створення гостя',
  })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Гостя успішно створено',
    badRequestMessage: 'Некоректні дані для створення гостя',
    conflictMessage: 'Гість з такими даними вже існує',
  })
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх гостей' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список гостей успішно отримано',
  })
  findAll() {
    return this.guestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати гостя за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId гостя',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Гостя успішно знайдено',
    badRequestMessage: 'Некоректний ID гостя',
    notFoundMessage: 'Гостя не знайдено',
  })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.guestsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити гостя за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId гостя',
  })
  @ApiBody({
    type: UpdateGuestDto,
    description: 'Дані для оновлення гостя',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Гостя успішно оновлено',
    badRequestMessage: 'Некоректні дані для оновлення гостя',
    notFoundMessage: 'Гостя не знайдено',
    conflictMessage: 'Конфлікт при оновленні гостя',
  })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateGuestDto: UpdateGuestDto,
  ) {
    return this.guestsService.update(id, updateGuestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити гостя за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId гостя',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Гостя успішно видалено',
    badRequestMessage: 'Некоректний ID гостя',
    notFoundMessage: 'Гостя не знайдено',
  })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.guestsService.remove(id);
  }
}
