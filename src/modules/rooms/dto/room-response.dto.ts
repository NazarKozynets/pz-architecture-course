import { ApiProperty } from '@nestjs/swagger';

export class RoomResponseDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab' })
  _id: string;

  @ApiProperty({ example: 'Deluxe Room' })
  name: string;

  @ApiProperty({ example: 3200 })
  price: number;

  @ApiProperty({ example: 2 })
  capacity: number;

  @ApiProperty({ example: 'Просторий номер з видом на море' })
  description?: string;

  @ApiProperty({
    example: 'available',
    enum: ['available', 'occupied', 'maintenance'],
  })
  status: string;

  @ApiProperty({ example: '2026-03-16T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-03-16T12:10:00.000Z' })
  updatedAt: string;
}

export class RoomsListResponseDto {
  @ApiProperty({ type: RoomResponseDto, isArray: true })
  rooms: RoomResponseDto[];
}
