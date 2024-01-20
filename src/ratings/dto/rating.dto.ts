import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class RatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  reviewText?: string;

  @IsNotEmpty()
  @IsDateString()
  reviewDate: string;

  @IsNotEmpty()
  @IsInt()
  idClient: number;

  @IsNotEmpty()
  @IsInt()
  idServiceProvider: number;
}
