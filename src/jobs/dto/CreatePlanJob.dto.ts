import { JobStatusEnum } from '../JobStatus.enum';
import { JobTypeEnum } from '../JobType.enum';
import { ClientEntity } from '../../migrations/client.entity';
import { ServiceEntity } from '../../migrations/service.entity';
import { TeamEntity } from '../../migrations/team.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlanJobDto {
  @IsString()
  jobStart?: string;

  @IsString()
  jobEnd?: string;

  @IsNotEmpty()
  status: JobStatusEnum = JobStatusEnum.SCHEDULED;

  @IsNotEmpty()
  jobType: JobTypeEnum = JobTypeEnum.PLANJOB;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  client: ClientEntity;

  @IsNotEmpty()
  service: ServiceEntity;

  team?: TeamEntity;
}
