import { Module } from '@nestjs/common';
import { TeamElementsModule } from './team-elements/team-elements.module';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from '../migrations/team.entity';
import { JobEntity } from '../migrations/job.entity';

@Module({
  imports: [
    TeamElementsModule,
    TypeOrmModule.forFeature([TeamEntity, JobEntity]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
