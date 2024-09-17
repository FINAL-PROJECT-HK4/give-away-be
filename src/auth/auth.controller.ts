import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface initData {
  queryId: string;
  inviteCode: string | null;
}

interface RefreshTokenProps {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async authenticate(@Body() data: initData) {
    const { queryId, inviteCode } = data;

    return this.authService.handleLogin(queryId, inviteCode);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenProps) {
    const refreshToken = data.refreshToken;

    return this.authService.refresh(refreshToken);
  }
}
