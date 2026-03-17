import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import {
  ServiceListResponseDto,
  ServiceResponseDto,
} from './dto/response-service.dto';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Створити нову послугу' })
  @ApiBody({
    type: CreateServiceDto,
    description: 'Дані для створення послуги',
  })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Послугу успішно створено',
    badRequestMessage: 'Некоректні дані для створення послуги',
    conflictMessage: 'Послуга з такими даними вже існує',
    successType: ServiceResponseDto,
  })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх послуг' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список послуг успішно отримано',
    successType: ServiceListResponseDto,
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати послугу за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId послуги',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Послугу успішно знайдено',
    badRequestMessage: 'Некоректний ID послуги',
    notFoundMessage: 'Послугу не знайдено',
    successType: ServiceResponseDto,
  })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити послугу за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId послуги',
  })
  @ApiBody({
    type: UpdateServiceDto,
    description: 'Дані для оновлення послуги',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Послугу успішно оновлено',
    badRequestMessage: 'Некоректні дані для оновлення послуги',
    notFoundMessage: 'Послугу не знайдено',
    conflictMessage: 'Конфлікт при оновленні послуги',
    successType: ServiceResponseDto,
  })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити послугу за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId послуги',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Послугу успішно видалено',
    badRequestMessage: 'Некоректний ID послуги',
    notFoundMessage: 'Послугу не знайдено',
  })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.servicesService.remove(id);
  }
}