import { Module } from '@nestjs/common';
import { TeamElementsController } from './team-elements.controller';
import { TeamElementsService } from './team-elements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from '../../migrations/team.entity';
import { ServiceProviderEntity } from '../../migrations/service-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProviderEntity, TeamEntity])],
  controllers: [TeamElementsController],
  providers: [TeamElementsService],
})
export class TeamElementsModule {}
