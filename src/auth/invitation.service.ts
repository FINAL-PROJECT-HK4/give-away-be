import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class InvitationService {
  private readonly CODE_LENGTH = 6;
  private readonly ALLOWED_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private readonly LIMIT = 15;

  async generateInvitationCode(attempts: number = 0): Promise<string> {
    if (attempts >= this.LIMIT) {
      throw new Error('Failed to generate a unique invitation code');
    }

    const invitationCode = Array.from(
      { length: this.CODE_LENGTH },
      () =>
        this.ALLOWED_CHARACTERS[
          Math.floor(Math.random() * this.ALLOWED_CHARACTERS.length)
        ],
    ).join('');

    const existingUser = await prisma.user.findFirst({
      where: {
        invite_code: invitationCode,
      },
    });

    if (!existingUser) return invitationCode;
    if (existingUser) return this.generateInvitationCode(attempts + 1);
  }
}
