import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userId')
  async getUser(@Param('userId') telegramId: string) {
    console.log('hhhhhh', telegramId);
    const result = this.userService.getUserById(telegramId);
    return result;
  }
}
