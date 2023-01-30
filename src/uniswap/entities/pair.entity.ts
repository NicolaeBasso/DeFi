import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Token } from '../types/token.type';

@Schema()
@ObjectType()
export class Pair {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Pair ID' })
  id: string;

  @Prop({ type: Token })
  @Field(() => Token, { description: 'Pair token0' })
  token0: Token;

  @Prop({ type: Token })
  @Field(() => Token, { description: 'Pair token1' })
  token1: Token;
}

export const PairSchema = SchemaFactory.createForClass(Pair);
