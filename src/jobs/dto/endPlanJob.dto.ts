import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class EndPlanJobDto {
  @IsInt()
  @IsNotEmpty()
  idJob: number;

  @IsNotEmpty()
  @IsDateString()
  jobEnd: string;
}
