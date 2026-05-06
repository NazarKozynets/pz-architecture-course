import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AddServiceDto {
  @ApiProperty({
    example: '65f1c9a2e4b0f123456789ad',
    description: 'ID додаткової послуги',
  })
  @IsMongoId()
  serviceId: string;
}
