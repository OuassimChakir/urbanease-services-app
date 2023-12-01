import { Module } from '@nestjs/common';
import { PlanJobsModule } from './plan-jobs/plan-jobs.module';
import { PricingPlansController } from './pricing-plans.controller';
import { PricingPlansService } from './pricing-plans.service';

@Module({
  imports: [PlanJobsModule],
  controllers: [PricingPlansController],
  providers: [PricingPlansService]
})
export class PricingPlansModule {}
