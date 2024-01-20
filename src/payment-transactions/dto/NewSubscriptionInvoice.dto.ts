import { TransacationTypeEnum } from '../transacationType.enum';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewSubscriptionInvoiceDto {
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  transactionType: TransacationTypeEnum = TransacationTypeEnum.INCOMING;

  @IsInt()
  @IsNotEmpty()
  idUser: number;

  @IsInt()
  @IsNotEmpty()
  idSubscription: number;
}
