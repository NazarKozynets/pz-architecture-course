import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../database/schemas/user.schema';

export class RegisterDto {
  @ApiProperty({ example: 'guest@hotel.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.GUEST, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
