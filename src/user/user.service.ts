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

  async spinGame(userId: string) {
    try {
      const result = await this.prisma
        .$queryRaw`SELECT spin_wheel(${userId});`;

        const spinResult = result[0].spin_wheel
        console.log("result::", spinResult);
        return {
          reward: spinResult.reward,
          spinAngle: spinResult.spin_angle,
        };
    } catch (error) {
      console.error('Error during spin wheel:', error);
      throw new Error('Spin wheel failed');
    }
  }
}
