import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Spa',
    description: 'Назва послуги',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Релакс-процедури та масаж',
    required: false,
    description: 'Опис послуги',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1500,
    description: 'Ціна послуги',
  })
  @IsNumber()
  @Min(0)
  price: number;
}