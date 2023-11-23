import { Module } from '@nestjs/common';
import { TeamElementsModule } from './team-elements/team-elements.module';

@Module({
  imports: [TeamElementsModule]
})
export class TeamsModule {}
