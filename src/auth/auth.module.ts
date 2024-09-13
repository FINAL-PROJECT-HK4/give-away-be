import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitationService } from './invitation.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: configService.get<string>('jwtExpiresIn') },
      }),
    }),
  ],
  providers: [AuthService, PrismaService, InvitationService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
