import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UniswapModule } from './uniswap/uniswap.module';
import { GraphClientModule } from './graphClient/graphClient.module';

@Module({
  imports: [
    CommonModule,
    UniswapModule,
    GraphClientModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
