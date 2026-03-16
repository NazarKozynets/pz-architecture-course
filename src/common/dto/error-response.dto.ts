import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'VALIDATION_ERROR' })
  code: string;

  @ApiProperty({
    example: 'Поле price повинно бути числом більше або рівним 0',
  })
  message: string;

  @ApiProperty({
    example: ['price must not be less than 0'],
    required: false,
    type: [String],
  })
  details?: string[];
}
