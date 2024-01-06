import { IsInt, IsNotEmpty, IsString, Min, Max, IsOptional } from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  reviewTest?: string;
}
