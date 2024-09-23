import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Req() req: any) {
    const telegramId = req.user.telegramId;
    console.log('telegram', telegramId);
    const result = await this.userService.getUserById(telegramId);
    console.log('result', result);
    return result;
  }

  @Get('friends')
  async getFriend(@Req() req: any) {
    const telegramId = req.user.telegramId;
    return await this.userService.getFriendByUserId(telegramId);
  }
}
