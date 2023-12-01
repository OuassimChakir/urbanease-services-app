import { Module } from '@nestjs/common';
import { TeamElementsController } from './team-elements.controller';
import { TeamElementsService } from './team-elements.service';

@Module({
  controllers: [TeamElementsController],
  providers: [TeamElementsService]
})
export class TeamElementsModule {}
