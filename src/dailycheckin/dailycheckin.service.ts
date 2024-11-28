import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DailycheckinService {
  constructor(readonly prisma: PrismaService) {}

  async checkUserCheckIn(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyCheckin = await this.prisma.dailyCheckin.findUnique({
      where: { user_id: userId },
    });

    if (!dailyCheckin) {
      return { checkedIn: false };
    }

    const checkinDate = dailyCheckin.checkin_date;

    if (checkinDate.setHours(0, 0, 0, 0) === today.getTime()) {
      return { checkedIn: true };
    }

    return { checkedIn: false };
  }

  async handleCheckin(userId: string): Promise<any> {
    try {
      const result = await this.prisma
        .$queryRaw`SELECT handle_daily_checkin(${userId});`;

      console.log("result::", result);
      
      return result;
    } catch (error) {
      console.error('Error during daily check-in:', error);
      throw new Error('Check-in failed');
    }
  }
}
