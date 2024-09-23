import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface initData {
  queryId: string;
  invitedCode: string | null;
}

interface RefreshTokenProps {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async authenticate(@Body() data: initData) {
  
    const { queryId, invitedCode } = data;
    return this.authService.handleLogin(queryId, invitedCode);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenProps) {
    const refreshToken = data.refreshToken;

    return this.authService.refresh(refreshToken);
  }
}
