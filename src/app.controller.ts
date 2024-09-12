import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLogger } from './common/service/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AppController.name);
    this.logger.info('AppController initialized');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
