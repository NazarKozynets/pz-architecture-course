import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsString } from 'class-validator';

export class ProcessPaymentDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab', description: 'ID бронювання' })
  @IsMongoId()
  bookingId: string;

  @ApiProperty({ example: 'card', enum: ['card', 'cash', 'online'] })
  @IsString()
  @IsIn(['card', 'cash', 'online'])
  method: string;

  @ApiProperty({ example: 'UAH', description: 'Валюта' })
  @IsString()
  currency: string;
}
