import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateGuestDto {
  @ApiProperty({
    example: 'Іван',
    description: "Ім'я гостя",
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    example: 'Петренко',
    description: 'Прізвище гостя',
  })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: 'ivan.petrenko@gmail.com',
    description: 'Email гостя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+380971234567',
    required: false,
    description: 'Номер телефону',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
