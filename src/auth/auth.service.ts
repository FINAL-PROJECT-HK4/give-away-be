import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async validateUser(
    telegramId: string,
    inviteCode: string,
  ): Promise<boolean> {
    return true;
  }

  private generateToken(telegramId: string) {
    const payload = { telegramId };

    const token = this.jwtService.sign({
      expiresIn: this.configService.get<string>('jwtExpiresIn'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwtRefreshSecret'),
      expiresIn: this.configService.get<string>('jwtRefreshExpiresIn'),
    });

    return { token, refreshToken };
  }

  async authenticate(telegramId: string, inviteCode: string) {
    const isValid = await this.validateUser(telegramId, inviteCode);

    if (!isValid) {
      throw new UnauthorizedException('Invalid invite code or telegram ID');
    }

    const { token, refreshToken } = this.generateToken(telegramId);

    return {
      success: true,
      token,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('jwtRefreshExpiresIn'),
      });

      const { token, refreshToken: newRefreshToken } = this.generateToken(
        payload.telegramId,
      );

      return {
        success: true,
        token,
        refreshToken: newRefreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
