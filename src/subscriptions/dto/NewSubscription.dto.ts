import { IsInt, IsNotEmpty } from 'class-validator';

export class NewSubscriptionDto {
  @IsNotEmpty()
  @IsInt()
  idClient: number;

  @IsNotEmpty()
  @IsInt()
  idPlan: number;
}
