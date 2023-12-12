import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from '../migrations/team.entity';
import { JobEntity } from '../migrations/job.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity, JobEntity, ServiceProviderEntity]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
