import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 'Deluxe Room',
    description: 'Назва номера',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 3200,
    description: 'Ціна за ніч',
  })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    example: 2,
    description: 'Місткість номера',
  })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({
    example: 'Просторий номер з видом на море',
    required: false,
    description: 'Опис номера',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'available',
    enum: ['available', 'occupied', 'maintenance'],
    description: 'Статус номера',
  })
  @IsIn(['available', 'occupied', 'maintenance'])
  status: string;
}