import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../database/schemas/user.schema';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'guest@hotel.com' })
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.GUEST })
  role: UserRole;
}
