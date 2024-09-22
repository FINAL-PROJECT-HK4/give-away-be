import { Controller, Get, Req } from '@nestjs/common';
import { DailycheckinService } from './dailycheckin.service';

@Controller('dailycheckin')
export class DailycheckinController {
  constructor(private dailycheckinService: DailycheckinService) {}

  @Get()
  async checkDaily(@Req() req: any) {
    const telegramId = req.user.telegramId;
    return await this.dailycheckinService.checkUserCheckIn(telegramId);
  }

  @Get('/checkin')
  async checkin(@Req() req: any) {
    const telegramId = req.user.telegramId;
    return await this.dailycheckinService.handleCheckin(telegramId);
  }
}
