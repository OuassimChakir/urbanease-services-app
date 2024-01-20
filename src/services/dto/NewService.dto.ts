import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class NewServiceDto {
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @IsString()
  serviceDescription: string;

  @IsInt()
  @IsNotEmpty()
  idServiceCategory: number;
}
