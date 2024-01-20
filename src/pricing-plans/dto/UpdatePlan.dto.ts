import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PlanTypeEnum } from '../PlanType.enum';

export class UpdatePlanDto {
  @IsNotEmpty()
  @IsString()
  planName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  planType: PlanTypeEnum;

  @IsInt()
  @IsNotEmpty()
  idService: number;
}
