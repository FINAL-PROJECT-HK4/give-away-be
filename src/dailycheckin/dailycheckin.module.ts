import { Module } from '@nestjs/common';
import { DailycheckinController } from './dailycheckin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DailycheckinService } from './dailycheckin.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [DailycheckinService, PrismaService],
  controllers: [DailycheckinController],
})
export class DailycheckinModule {}
