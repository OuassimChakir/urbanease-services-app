import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamEntity } from '../migrations/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Post('/new')
  createTeam(
    @Body('serviceProvidersIds') serviceProvidersIds: number[],
  ): Promise<TeamEntity> {
    return this.teamService.createTeam(serviceProvidersIds);
  }

  @Delete(':idTeam/delete')
  destroyTeam(@Param('idTeam') idTeam: number) {
    return this.teamService.destroyTeam(idTeam);
  }
}
