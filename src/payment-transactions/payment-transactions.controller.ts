import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentTransactionsService } from './payment-transactions.service';
import { ClientPaymentDto } from './dto/ClientPayment.dto';
import { PaymentEntity } from '../migrations/payment.entity';
import { PayServiceProviderDto } from './dto/PayServiceProvider.dto';
import { ServiceProvidersService } from '../service-providers/service-providers.service';

@Controller('payment-transactions')
export class PaymentTransactionsController {
  constructor(
    private paymentService: PaymentTransactionsService,
    private serviceProviderService: ServiceProvidersService,
  ) {}

  @Patch('ClientPayment/:idPayment/')
  validateClientPayment(
    @Param('idPayment') idPayment: number,
    @Body() clientPaymentDto: ClientPaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.clientPayment(idPayment, clientPaymentDto);
  }

  @Post('ServiceProvider/:idServiceProvider/generate')
  generateServiceProviderPayment(
    @Param('idServiderProvider') idServiceProvider: number,
    @Body() payServiceProvider: PayServiceProviderDto,
  ): void {
    const serviceProvider =
      this.serviceProviderService.getServiceProvider(idServiceProvider);
    serviceProvider
      .then((spEntity) => {
        return this.paymentService.generateServiceProviderPayment(
          spEntity,
          payServiceProvider,
        );
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  @Patch('ServiceProvider/:idPayment/approve')
  approveServiceProviderPayment(
    @Param('idPayment') idPayment: number,
  ): Promise<PaymentEntity> {
    return this.paymentService.approveServiceProviderPayment(idPayment);
  }
}
