import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { AppLogger } from './service/logger.service';

@Global()
@Module({
  imports: [ConfigModule, SwaggerModule],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class CommonModule {}
