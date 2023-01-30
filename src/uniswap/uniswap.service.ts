import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { GraphClientService } from 'src/graphClient/graphClient.service';
import { pairsDocument } from '../../.graphclient';
import { Pair } from './entities/pair.entity';

@Injectable()
export class UniswapService {
  constructor(
    @InjectModel(Pair.name)
    private readonly pairModel: Model<Pair>,
    private readonly graphClient: GraphClientService,
    private readonly configService: ConfigService,
  ) {}

  public pairsFirst = Number(
    this.configService.get<number>('UNISWAP_PAIRS_FIRST'),
  );
  public pairsStep = Number(
    this.configService.get<number>('UNISWAP_PAIRS_STEP'),
  );
  public maxSkip = Number(
    this.configService.get<number>('UNISWAP_PAIRS_SKIP_MAX'),
  );

  getAllLocalPairs = () => this.pairModel.find().exec();

  deleteAllPairs = async () => this.pairModel.deleteMany();

  fetchAllRemotePairs = async () => {
    const allPairs = [];

    const requests = Array.from(
      Array(this.maxSkip / this.pairsStep).keys(),
    ).map((step) => {
      return this.graphClient.fetchPairs(pairsDocument, {
        first: this.pairsFirst,
        skip: step * this.pairsStep,
      });
    });

    await Promise.allSettled(requests).then((chunks) => {
      chunks
        ?.flat()
        ?.forEach((chunk: any) => allPairs.push(...chunk?.value?.data?.pairs));
    });

    return allPairs;
  };

  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_30_MINUTES)
  async syncAllPairs() {
    const pairs = await this.fetchAllRemotePairs();
    await this.deleteAllPairs();

    return this.pairModel.create(pairs);
  }
}
