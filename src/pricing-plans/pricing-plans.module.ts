import { Module } from '@nestjs/common';
import { PricingPlansController } from './pricing-plans.controller';
import { PricingPlansService } from './pricing-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { PlanItemsEntity } from '../migrations/plan-items.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { ServiceEntity } from '../migrations/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanEntity,
      PlanItemsEntity,
      SubscriptionEntity,
      ServiceEntity,
    ]),
  ],
  controllers: [PricingPlansController],
  providers: [PricingPlansService],
})
export class PricingPlansModule {}
