import { Module } from '@nestjs/common';
import { PlanJobsModule } from './plan-jobs/plan-jobs.module';
import { PricingPlansController } from './pricing-plans.controller';
import { PricingPlansService } from './pricing-plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from '../migrations/plan.entity';
import { PlanItemsEntity } from '../migrations/plan-items.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';

@Module({
  imports: [
    PlanJobsModule,
    TypeOrmModule.forFeature([PlanEntity, PlanItemsEntity, SubscriptionEntity]),
  ],
  controllers: [PricingPlansController],
  providers: [PricingPlansService],
})
export class PricingPlansModule {}
