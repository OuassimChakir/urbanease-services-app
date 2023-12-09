import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ServiceProviderEnum } from '../ServiceProvider.enum';

export class NewServiceProviderDto {
  @IsNotEmpty()
  @IsString()
  cnie: string;

  @IsInt()
  etat?: ServiceProviderEnum = ServiceProviderEnum.IN_SERVICE;
}
