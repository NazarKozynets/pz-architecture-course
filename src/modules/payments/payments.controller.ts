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

import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import {
  PaymentResponseDto,
  PaymentsListResponseDto,
} from './dto/response-payment.dto';
import { DeleteResponseDto } from './dto/delete-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити новий платіж' })
  @ApiBody({
    type: CreatePaymentDto,
    description: 'Дані для створення платежу',
  })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Платіж успішно створено',
    successType: PaymentResponseDto,
    badRequestMessage: 'Некоректні дані для створення платежу',
    conflictMessage: 'Платіж з такими даними вже існує',
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх платежів' })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Список платежів успішно отримано',
    successType: PaymentsListResponseDto,
  })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати платіж за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId платежу',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Платіж успішно знайдено',
    successType: PaymentResponseDto,
    badRequestMessage: 'Некоректний ID платежу',
    notFoundMessage: 'Платіж не знайдено',
  })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.paymentsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити платіж за ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: '65f1c9a2e4b0f123456789ab',
    description: 'MongoDB ObjectId платежу',
  })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Платіж успішно видалено',
    successType: DeleteResponseDto,
    badRequestMessage: 'Некоректний ID платежу',
    notFoundMessage: 'Платіж не знайдено',
  })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.paymentsService.remove(id);
  }
}