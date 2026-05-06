import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId } from 'class-validator';

export class BookRoomDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab', description: 'ID гостя' })
  @IsMongoId()
  guestId: string;

  @ApiProperty({ example: '65f1c9a2e4b0f123456789ac', description: 'ID номера' })
  @IsMongoId()
  roomId: string;

  @ApiProperty({ example: '2026-06-01', description: 'Дата заїзду' })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({ example: '2026-06-05', description: 'Дата виїзду' })
  @IsDateString()
  checkOutDate: string;
}
