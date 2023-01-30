import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphClientModule } from 'src/graphClient/graphClient.module';
import { Pair, PairSchema } from './entities/pair.entity';
import { UniswapController } from './uniswap.controller';
import { UniswapService } from './uniswap.service';

@Module({
  controllers: [UniswapController],
  imports: [
    GraphClientModule,
    MongooseModule.forFeature([
      {
        name: Pair.name,
        schema: PairSchema,
      },
    ]),
  ],
  providers: [UniswapService],
})
export class UniswapModule {}
