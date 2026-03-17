import { ApiProperty } from '@nestjs/swagger';

export class GuestResponseDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab' })
  _id: string;

  @ApiProperty({ example: 'Іван' })
  firstName: string;

  @ApiProperty({ example: 'Петренко' })
  lastName: string;

  @ApiProperty({ example: 'ivan.petrenko@gmail.com' })
  email: string;

  @ApiProperty({ example: '+380971234567' })
  phone?: string;

  @ApiProperty({ example: '2026-03-16T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-03-16T12:10:00.000Z' })
  updatedAt: string;
}

export class GuestListResponseDto {
  @ApiProperty({ type: GuestResponseDto, isArray: true })
  guests: GuestResponseDto[];
}