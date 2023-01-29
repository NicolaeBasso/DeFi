import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { GraphqlModule } from './graphql.module';

@Module({
  imports: [ConfigModule, GraphqlModule],
  exports: [ConfigModule, GraphqlModule],
})
export class CommonModule {}
