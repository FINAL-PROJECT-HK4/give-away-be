import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userId')
  async getUser(@Param('userId') telegramId: string) {
    return await this.userService.getUserById(telegramId);
  }

  @Get('friends/:userId')
  async getFriend(@Param('userId') telegramId: string) {
    const result = await this.userService.getFriendByUserId(telegramId);
    return result;
  }
}
