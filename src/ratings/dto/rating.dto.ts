import { IsInt, IsNotEmpty, IsString, Min, Max, IsOptional } from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  reviewTest?: string;
}
