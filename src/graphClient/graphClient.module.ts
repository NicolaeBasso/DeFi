import { Module } from '@nestjs/common';
import { GraphClientService } from './graphClient.service';

@Module({
  providers: [GraphClientService],
  exports: [GraphClientService],
})
export class GraphClientModule {}
