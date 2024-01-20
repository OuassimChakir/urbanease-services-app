import { Controller, Get, Redirect } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  // @Get('pay')
  // @Redirect()
  // async initiatePayment(): Promise<{ url: string }> {
  //   const paymentUrl = await this.paypalService.createPayment();
  //   return { url: paymentUrl };
  // }
}
