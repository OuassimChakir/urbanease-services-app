import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../migrations/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
