import { JobStatusEnum } from '../JobStatus.enum';
import { JobTypeEnum } from '../JobType.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanJobDto {
  @IsString()
  @IsNotEmpty()
  jobStart: string;

  @IsString()
  jobEnd: string;

  @IsNotEmpty()
  status: JobStatusEnum = JobStatusEnum.SCHEDULED;

  @IsNotEmpty()
  jobType: JobTypeEnum = JobTypeEnum.PLANJOB;

  @IsString()
  description?: string;

  @IsNotEmpty()
  idClient: number;

  @IsNotEmpty()
  idService: number;

  @IsNotEmpty()
  idPlan: number;

  @IsNotEmpty()
  idSubscription: number;

  @IsNotEmpty()
  serviceProviderIds?: number[];
}
