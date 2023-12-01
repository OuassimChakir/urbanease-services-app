import { Module } from '@nestjs/common';
import { TeamElementsModule } from './team-elements/team-elements.module';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [TeamElementsModule],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
