import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getUser(@Param('userId') telegramId: string) {
    return await this.userService.getUserById(telegramId);
  }

  @UseGuards(AuthGuard)
  @Get('friends/:userId')
  async getFriend(@Param('userId') telegramId: string) {
    const result = await this.userService.getFriendByUserId(telegramId);
    return result;
  }
}
