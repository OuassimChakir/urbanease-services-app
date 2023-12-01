import { Module } from '@nestjs/common';
import { PlanJobsController } from './plan-jobs.controller';
import { PlanJobsService } from './plan-jobs.service';

@Module({
  controllers: [PlanJobsController],
  providers: [PlanJobsService]
})
export class PlanJobsModule {}
