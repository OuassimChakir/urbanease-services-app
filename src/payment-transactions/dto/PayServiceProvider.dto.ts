import { TransacationTypeEnum } from '../transacationType.enum';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayServiceProviderDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  transactionType: TransacationTypeEnum = TransacationTypeEnum.OUTCOMING;

  @IsInt()
  @IsNotEmpty()
  idUser: number;
}
