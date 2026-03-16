import { ApiProperty } from '@nestjs/swagger';

export class DeleteGuestDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Гостя успішно видалено' })
  message: string;
}