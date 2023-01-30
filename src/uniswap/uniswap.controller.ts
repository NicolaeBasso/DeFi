import { Controller, Get, Patch, Delete } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Controller('uniswap')
export class UniswapController {
  constructor(private uniswapService: UniswapService) {}

  @Get('pairs/remote/all')
  async getRemotePairs(): Promise<any> {
    const pairs = this.uniswapService.fetchAllRemotePairs();
    return pairs;
  }

  @Get('pairs/all')
  async getLocalPairs(): Promise<any> {
    const pairs = this.uniswapService.getAllLocalPairs();
    return pairs;
  }

  @Patch('pairs/sync')
  async syncPairs(): Promise<any> {
    return this.uniswapService.syncAllPairs();
  }

  @Delete('pairs/delete/all')
  async deleteAllPairs(): Promise<any> {
    return this.uniswapService.deleteAllPairs();
  }
}
