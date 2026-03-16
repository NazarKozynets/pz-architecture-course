import { ApiProperty } from '@nestjs/swagger';

export class DeleteBookingDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Бронювання успішно видалено' })
  message: string;
}