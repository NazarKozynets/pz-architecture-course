import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoomDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Кімнату успішно видалено' })
  message: string;
}