import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from '../../common/decorators/public.decorator';
import { ApiEndpointResponses } from '../../common/decorators/response.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  @ApiBody({ type: RegisterDto })
  @ApiEndpointResponses({
    successStatus: 'created',
    successDescription: 'Користувача успішно зареєстровано',
    successType: AuthResponseDto,
    badRequestMessage: 'Некоректні дані реєстрації',
    conflictMessage: 'Користувач з таким email вже існує',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вхід до системи' })
  @ApiBody({ type: LoginDto })
  @ApiEndpointResponses({
    successStatus: 'ok',
    successDescription: 'Успішний вхід',
    successType: AuthResponseDto,
    badRequestMessage: 'Некоректні дані',
    unauthorizedMessage: 'Невірний email або пароль',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
