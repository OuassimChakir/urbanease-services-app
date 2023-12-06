import { Module } from '@nestjs/common';
import { PlanJobsController } from './plan-jobs.controller';
import { PlanJobsService } from './plan-jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from '../../migrations/plan.entity';
import { JobEntity } from '../../migrations/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity, JobEntity])],
  controllers: [PlanJobsController],
  providers: [PlanJobsService],
})
export class PlanJobsModule {}
