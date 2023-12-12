import { JobStatusEnum } from '../JobStatus.enum';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateJobStatusDto {
  @IsInt()
  @IsNotEmpty()
  idJob: number;

  @IsNotEmpty()
  status: JobStatusEnum;
}
