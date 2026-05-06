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

import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import {
  GuestListResponseDto,
  GuestResponseDto,
} from './dto/response-guest.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../database/schemas/user.schema';

@ApiBearerAuth()
@ApiTags('guests')
@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Зареєструвати нового гостя (тільки адміністратор)' })
  @ApiBody({ type: CreateGuestDto, description: 'Дані для створення гостя' })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Гостя успішно створено',
    badRequestMessage: 'Некоректні дані для створення гостя',
    conflictMessage: 'Гість з такими даними вже існує',
    successType: GuestResponseDto,
  })
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Отримати список усіх гостей (тільки адміністратор)' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список гостей успішно отримано',
    successType: GuestListResponseDto,
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
    successType: GuestResponseDto,
  })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.guestsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Оновити гостя за ID (тільки адміністратор)' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId гостя',
  })
  @ApiBody({ type: UpdateGuestDto, description: 'Дані для оновлення гостя' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Гостя успішно оновлено',
    badRequestMessage: 'Некоректні дані для оновлення гостя',
    notFoundMessage: 'Гостя не знайдено',
    conflictMessage: 'Конфлікт при оновленні гостя',
    successType: GuestResponseDto,
  })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateGuestDto: UpdateGuestDto,
  ) {
    return this.guestsService.update(id, updateGuestDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Видалити гостя за ID (тільки адміністратор)' })
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
