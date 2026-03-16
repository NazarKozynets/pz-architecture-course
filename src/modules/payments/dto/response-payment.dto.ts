import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab' })
  _id: string;

  @ApiProperty({ example: 2500 })
  amount: number;

  @ApiProperty({ example: 'UAH' })
  currency: string;

  @ApiProperty({
    example: 'paid',
    enum: ['pending', 'paid', 'failed', 'refunded'],
  })
  status: string;

  @ApiProperty({ example: 'card' })
  method?: string;

  @ApiProperty({ example: '2026-03-16T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-03-16T12:10:00.000Z' })
  updatedAt: string;
}

export class PaymentsListResponseDto {
  @ApiProperty({
    type: [PaymentResponseDto],
  })
  items: PaymentResponseDto[];

  @ApiProperty({ example: 5 })
  total: number;
}