import { ApiProperty } from '@nestjs/swagger';

export class DeleteServiceDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Послугу успішно видалено' })
  message: string;
}