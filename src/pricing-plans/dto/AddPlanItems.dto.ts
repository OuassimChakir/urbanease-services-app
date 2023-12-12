import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddPlanItemsDto {
  @IsNotEmpty()
  @IsString()
  item: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsInt()
  @IsNotEmpty()
  idPlan: number;
}
