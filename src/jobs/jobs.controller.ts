import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/CreateJob.dto';
import { TeamsService } from '../teams/teams.service';
import { JobEntity } from '../migrations/job.entity';

@Controller('jobs')
export class JobsController {
  constructor(
    private jobService: JobsService,
    private teamService: TeamsService,
  ) {}

  @Get('/')
  getJobs(): Promise<JobEntity[]> {
    return this.jobService.getJobs();
  }

  @Get(':idJob')
  getJob(@Param('idJob') idJob: number): Promise<JobEntity> {
    return this.jobService.getJob(idJob);
  }

  @Post('/new')
  createJob(@Body() createJobDto: CreateJobDto) {
    const { serviceProviderIds } = createJobDto;
    const team = this.teamService.createTeam(serviceProviderIds);
    team
      .then((teamEntity) => {
        return this.jobService.createJob(createJobDto, teamEntity);
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  @Delete(':idJob/delete')
  async deleteJob(@Param('idJob') idJob: number) {
    const job = await this.jobService.getJob(idJob);
    if (!job) {
      throw new NotFoundException(`Job ID ${idJob} Not Found!`);
    }
    const idTeam = job.team.idTeam;
    await this.jobService.deleteJob(idJob);
    await this.teamService.destroyTeam(idTeam);
    return 'Job has been deleted successfully!';
  }
}
