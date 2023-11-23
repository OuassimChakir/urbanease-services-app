import { Module } from '@nestjs/common';
import { PlanJobsModule } from './plan-jobs/plan-jobs.module';

@Module({
  imports: [PlanJobsModule]
})
export class PricingPlansModule {}
