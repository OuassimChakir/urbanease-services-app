import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @IsString()
  serviceDescription: string;

  @IsInt()
  @IsNotEmpty()
  idServiceCategory: number;
}
