import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: { telegram_id: userId },
    });
  }

  async getFriendByUserId(userId: string) {
    return await this.prisma.referralInvitations.findMany({
      where: { user_id: userId },
      include: {
        user: true,
      },
    });
  }
}
