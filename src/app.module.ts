import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
