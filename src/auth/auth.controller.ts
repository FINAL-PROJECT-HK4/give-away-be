import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface User {
  telegramId: string;
  inviteCode: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async authenticate(@Body() data: User) {
    const { telegramId, inviteCode } = data;

    return this.authService.authenticate(telegramId, inviteCode);
  }
}
