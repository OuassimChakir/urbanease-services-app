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
  price: number;

  idClient: number;

  @IsNotEmpty()
  idService: number;

  serviceProviderIds?: number[];
}
