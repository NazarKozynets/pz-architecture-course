import { ApiProperty } from '@nestjs/swagger';

export class BookingResponseDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ad' })
  _id: string;

  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab' })
  guestId: string;

  @ApiProperty({ example: '65f1c9a2e4b0f123456789ac' })
  roomId: string;

  @ApiProperty({ example: '2026-03-20T00:00:00.000Z' })
  checkInDate: string;

  @ApiProperty({ example: '2026-03-25T00:00:00.000Z' })
  checkOutDate: string;

  @ApiProperty({
    example: 'confirmed',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
  })
  status: string;

  @ApiProperty({ example: 12500 })
  totalPrice: number;

  @ApiProperty({ example: '2026-03-16T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-03-16T12:10:00.000Z' })
  updatedAt: string;
}

export class BookingListResponseDto {
  @ApiProperty({ type: BookingResponseDto, isArray: true })
  bookings: BookingResponseDto[];
}