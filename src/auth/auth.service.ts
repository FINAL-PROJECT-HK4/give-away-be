import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import CryptoJS from 'crypto-js';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitationService } from './invitation.service';

@Injectable()
export class AuthService {
  private readonly telegramSecret = process.env.BOT_TOKEN;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly invitationService: InvitationService,
  ) {}

  async createUser(
    telegramId: string,
    username: string,
    inviteCode: string,
    rewardPoint: number = 0,
  ) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          telegram_id: telegramId,
          user_name: username,
          invite_code: inviteCode,
          reward_point: rewardPoint,
        },
      });
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new UnauthorizedException('Could not create user');
    }
  }

  async findUserByTelegramId(id: string) {
    return this.prisma.user.findUnique({
      where: { telegram_id: id },
    });
  }

  async createReferralInvitations(
    userId: string,
    invitedUser: string,
    invite_code: string,
  ) {
    try {
      const newReferralInvitations =
        await this.prisma.referralInvitations.create({
          data: {
            user_id: userId,
            invited_user: invitedUser,
            invite_code: invite_code,
          },
        });
      return newReferralInvitations;
    } catch (error) {
      console.error('Error creating ReferralInvitations:', error);
      throw new UnauthorizedException('Could not create ReferralInvitations');
    }
  }

  async getUserByInviteCode(inviteCode) {
    return this.prisma.user.findUnique({
      where: { invite_code: inviteCode },
    });
  }

  async processUser(user: any, invitedCode: any): Promise<any> {
    const { id: telegramId, username } = user;

    const inviteCode = await this.invitationService.generateInvitationCode();

    let existingUser = await this.findUserByTelegramId(telegramId.toString());

    if (existingUser) {
      return existingUser;
    }
    existingUser = await this.createUser(
      telegramId.toString(),
      username,
      inviteCode,
    );

    if (invitedCode) {
      const userByInvitedCode = await this.getUserByInviteCode(invitedCode);
      await this.createReferralInvitations(
        userByInvitedCode.telegram_id,
        telegramId.toString(),
        invitedCode,
      );
    }

    return existingUser;
  }

  async verifyTelegramAuth(data: string): Promise<any> {
    const initData = new URLSearchParams(data);
    const userJSON = initData.get('user');

    if (!userJSON) {
      throw new UnauthorizedException('No user data found');
    }
    const user = JSON.parse(decodeURIComponent(userJSON!));

    const hash = initData.get('hash');
    const dataToCheck: string[] = [];

    initData.sort();
    initData.forEach(
      (val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`),
    );

    const secret = CryptoJS.HmacSHA256(this.telegramSecret, 'WebAppData');
    const calculatedHash = CryptoJS.HmacSHA256(
      dataToCheck.join('\n'),
      secret,
    ).toString(CryptoJS.enc.Hex);

    if (hash !== calculatedHash) {
      throw new UnauthorizedException('Invalid hash');
    }
    return { user, isValid: true };
  }

  public async handleLogin(data, inviteCode) {
    
    const { user, isValid } = await this.verifyTelegramAuth(data);
    if (!isValid) {
      throw new UnauthorizedException('Invalid hash');
    }

    const userInDb = await this.processUser(user, inviteCode);

    const { accessToken, refreshToken } = await this.generateToken(userInDb);

    return {
      success: true,
      accessToken,
      refreshToken,
    };
  }

  private generateToken(userInDb: any) {
    const { telegram_id: telegramId, user_name: username } = userInDb;
    const payload = { telegramId, username };

  

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwtExpiresIn'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwtRefreshSecret'),
      expiresIn: this.configService.get<string>('jwtRefreshExpiresIn'),
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('jwtRefreshSecret'),
      });

      const { accessToken, refreshToken: newRefreshToken } =
        this.generateToken(payload);

      return {
        success: true,
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
