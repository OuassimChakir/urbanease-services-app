import { JobStatusEnum } from '../JobStatus.enum';
import { JobTypeEnum } from '../JobType.enum';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  jobStart: string;

  @IsString()
  @IsNotEmpty()
  jobEnd: string;

  @IsNotEmpty()
  status: JobStatusEnum = JobStatusEnum.SCHEDULED;

  @IsNotEmpty()
  jobType: JobTypeEnum = JobTypeEnum.IND;

  @IsString()
  description?: string;

  @IsNumber()
  price?: number;

  @IsNotEmpty()
  idClient: number;

  @IsNotEmpty()
  idService: number;

  @IsNotEmpty()
  idPlan: number;

  serviceProviderIds?: number[];
}
