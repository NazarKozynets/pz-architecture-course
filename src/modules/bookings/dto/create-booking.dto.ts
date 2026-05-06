import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: '65f1c9a2e4b0f123456789ab',
    description: 'ID гостя',
  })
  @IsMongoId()
  guestId: string;

  @ApiProperty({
    example: '65f1c9a2e4b0f123456789ac',
    description: 'ID номера',
  })
  @IsMongoId()
  roomId: string;

  @ApiProperty({
    example: '2026-03-20',
    description: 'Дата заїзду',
  })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({
    example: '2026-03-25',
    description: 'Дата виїзду',
  })
  @IsDateString()
  checkOutDate: string;

  @ApiProperty({
    example: 'pending',
    enum: ['pending', 'confirmed', 'checked_in', 'cancelled', 'completed'],
    description: 'Статус бронювання',
  })
  @IsIn(['pending', 'confirmed', 'checked_in', 'cancelled', 'completed'])
  status: string;

  @ApiProperty({
    example: 12500,
    required: false,
    description: 'Загальна вартість бронювання',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;
}
