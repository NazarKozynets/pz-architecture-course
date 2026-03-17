import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseDto {
  @ApiProperty({ example: '65f1c9a2e4b0f123456789ab' })
  _id: string;

  @ApiProperty({ example: 'Spa' })
  name: string;

  @ApiProperty({ example: 'Релакс-процедури та масаж' })
  description?: string;

  @ApiProperty({ example: 1500 })
  price: number;

  @ApiProperty({ example: '2026-03-16T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-03-16T12:10:00.000Z' })
  updatedAt: string;
}

export class ServiceListResponseDto {
  @ApiProperty({ type: ServiceResponseDto })
  services: ServiceResponseDto[];
}