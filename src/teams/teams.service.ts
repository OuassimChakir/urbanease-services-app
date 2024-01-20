import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from '../migrations/team.entity';
import { Repository } from 'typeorm';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepo: Repository<TeamEntity>,

    @InjectRepository(ServiceProviderEntity)
    private serviceProviderRepo: Repository<ServiceProviderEntity>,
  ) {}

  async createTeam(serviceProvidersIds: number[]): Promise<TeamEntity> {
    const teamElements: ServiceProviderEntity[] =
      await this.serviceProviderRepo.find({
        where: serviceProvidersIds.map((idServiceProvider: number) => ({
          idServiceProvider,
        })),
      });

    const team: TeamEntity = this.teamRepo.create();
    team.serviceProviders = teamElements;
    return await this.teamRepo.save(team);
  }

  async destroyTeam(idTeam: number): Promise<TeamEntity> {
    const team: TeamEntity = await this.teamRepo.findOneBy({ idTeam: idTeam });

    if (!team) {
      throw new NotFoundException(`Team ID ${idTeam} Not Found!`);
    }

    return await this.teamRepo.remove(team);
  }
}
