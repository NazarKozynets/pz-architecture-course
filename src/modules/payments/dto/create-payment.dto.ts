import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 2500,
    description: 'Сума платежу',
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    example: 'UAH',
    description: 'Валюта платежу',
  })
  @IsString()
  @MinLength(3)
  currency: string;

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'paid', 'failed', 'refunded'],
    description: 'Статус платежу',
  })
  @IsIn(['pending', 'paid', 'failed', 'refunded'])
  status: string;

  @ApiProperty({
    example: 'card',
    required: false,
    description: 'Метод оплати',
  })
  @IsOptional()
  @IsString()
  method?: string;
}