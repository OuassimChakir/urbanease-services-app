import { JobStatusEnum } from '../JobStatus.enum';
import { JobTypeEnum } from '../JobType.enum';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateJobDto {
  @IsNotEmpty()
  status: JobStatusEnum = JobStatusEnum.SCHEDULED;

  @IsNotEmpty()
  jobType: JobTypeEnum = JobTypeEnum.IND;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;
}
