import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../migrations/job.entity';
import { ClientEntity } from '../migrations/client.entity';
import { TeamEntity } from '../migrations/team.entity';
import { ServiceEntity } from '../migrations/service.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { TeamsService } from '../teams/teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobEntity,
      ClientEntity,
      TeamEntity,
      ServiceEntity,
      ServiceProviderEntity,
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService, TeamsService],
})
export class JobsModule {}
