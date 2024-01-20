import { IsDate, IsNotEmpty } from 'class-validator';
import { PaymentMethodEnum } from '../payment-method.enum';
import { PaymentStatusEnum } from '../payment-status.enum';

export class ClientPaymentDto {
  @IsDate()
  @IsNotEmpty()
  paymentDate: string;

  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum = PaymentMethodEnum.ONLINE;

  @IsNotEmpty()
  status: PaymentStatusEnum;
}
