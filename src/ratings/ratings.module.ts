// rating.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './ratings.controller';
import { RatingService } from './ratings.service';
import { RatingEntity } from '../migrations/rating.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingEntity, SubscriptionEntity]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
