import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { ClientEntity } from '../migrations/client.entity';
import { PlanEntity } from '../migrations/plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity, ClientEntity, PlanEntity]),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
