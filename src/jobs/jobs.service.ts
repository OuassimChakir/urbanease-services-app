import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from '../migrations/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/CreateJob.dto';
import { ClientEntity } from '../migrations/client.entity';
import { TeamEntity } from '../migrations/team.entity';
import { ServiceEntity } from '../migrations/service.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { UpdateJobDto } from './dto/UpdateJob.dto';
import { UpdateJobStatusDto } from './dto/updateJobStatus.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepo: Repository<JobEntity>,
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(TeamEntity)
    private teamRepo: Repository<TeamEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
    @InjectRepository(ServiceProviderEntity)
    private serviceProviderRepo: Repository<ServiceProviderEntity>,
  ) {}

  /*------------------------
  / Create JOB
  /----------------------- */
  async createJob(
    createJobDto: CreateJobDto,
    team: TeamEntity,
  ): Promise<JobEntity> {
    const {
      jobStart,
      jobEnd,
      status,
      jobType,
      description,
      price,
      idClient,
      idService,
    } = createJobDto;

    const client: ClientEntity = await this.clientRepo.findOneBy({
      idClient: idClient,
    });

    if (!client)
      throw new NotFoundException(`Client ID ${idClient} Not Found!`);

    const service: ServiceEntity = await this.serviceRepo.findOneBy({
      idService: idService,
    });
    if (!service)
      throw new NotFoundException(`Service ID ${idClient} Not Found!`);

    const newJob = this.jobRepo.create({
      jobStart,
      jobEnd,
      status,
      jobType,
      description,
      price,
    });
    newJob.client = client;
    newJob.service = service;
    if (team != null) {
      newJob.team = team;
    }

    return await this.jobRepo.save(newJob);
  }

  /*------------------------
  / Delete JOB
  /----------------------- */
  async deleteJob(idJob: number) {
    const job: JobEntity = await this.jobRepo.findOneBy({ idJob: idJob });

    if (!job) {
      throw new NotFoundException(`Job ID ${idJob} Not Found!`);
    }

    await this.jobRepo.remove(job);
  }

  /*------------------------
  / SELECT JOBS
  /----------------------- */
  async getJob(idJob: number): Promise<JobEntity> {
    const job = await this.jobRepo.findOne({
      where: { idJob: idJob },
      relations: {
        client: true,
        service: true,
        team: true,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job ID ${idJob} Not Found!`);
    }
    return job;
  }

  async getJobs(): Promise<JobEntity[]> {
    return await this.jobRepo.find({
      relations: {
        client: true,
        service: true,
        team: true,
      },
    });
  }

  /*------------------------
  / JOB UPDATES
  /----------------------- */
  async updateJob(
    updateJobDto: UpdateJobDto,
    idJob: number,
  ): Promise<JobEntity> {
    const job: JobEntity = await this.jobRepo.findOneBy({ idJob: idJob });
    const { status, jobType, description, price } = updateJobDto;
    if (!job) {
      throw new NotFoundException(`Job ID ${idJob} Not Found!`);
    }

    job.status = status;
    job.jobType = jobType;
    job.description = description;
    job.price = price;

    return await this.jobRepo.save(job);
  }

  async updateJobStatus(
    updateJobStatusDto: UpdateJobStatusDto,
  ): Promise<JobEntity> {
    const { idJob, status } = updateJobStatusDto;

    const job: JobEntity = await this.jobRepo.findOneBy({ idJob: idJob });
    if (!job) {
      throw new NotFoundException(`Job ID ${idJob} Not Found!`);
    }

    job.status = status;
    return await this.jobRepo.save(job);
  }
}
