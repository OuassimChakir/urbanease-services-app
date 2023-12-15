import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { PaypalService } from '../paypal/paypal.service';
import { PricingPlansService } from '../pricing-plans/pricing-plans.service';
import { PlanEntity } from '../migrations/plan.entity';
import { PaymentTransactionsService } from '../payment-transactions/payment-transactions.service';
import { PaymentMethodEnum } from '../payment-transactions/payment-method.enum';
import { TransacationTypeEnum } from '../payment-transactions/transacationType.enum';
import { PaymentStatusEnum } from '../payment-transactions/payment-status.enum';
import { ClientsService } from '../clients/clients.service';
import { addDays, format, parseISO } from 'date-fns';
import { UserService } from '../user/user.service';
import { SubscriptionStatusEnum } from './subscription-status.enum';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private subscriptionService: SubscriptionsService,
    private paypalService: PaypalService,
    private planService: PricingPlansService,
    private paymentService: PaymentTransactionsService,
    private clientService: ClientsService,
    private userService: UserService,
  ) {}

  @Get('/payment/plan/:idPlan')
  @Redirect()
  async paySubscription(@Param('idPlan') idPlan: number) {
    const plan: PlanEntity = await this.planService.getPricingPlan(idPlan);
    const success_url = 'subscriptions/payment/verify';
    const cancel_url = 'subscriptions/payment/verify';
    const paymentUrl = await this.paypalService.createPayment(
      plan,
      success_url,
      cancel_url,
    );
    return { url: paymentUrl };
  }

  @Get('/payment/verify')
  async validateSubscription(
    @Query('paymentId') paymentId: string,
    @Query('PayerID') payerId: string,
  ) {
    const idUser = 2;
    const client = await this.clientService.getClientByUser(idUser);
    const user = await this.userService.getUser(idUser);
    try {
      const result = await this.paypalService.executePayment(
        paymentId,
        payerId,
      );
      const plan = await this.planService.getPricingPlan(
        result.transactions[0].custom,
      );
      const startDate = result.create_time;
      const paredDate = parseISO(startDate);
      const endDate = format(addDays(paredDate, 30), 'yyyy-MM-dd HH:mm:ss');

      const subscription = await this.subscriptionService.newSubscription(
        client,
        plan,
        startDate,
        endDate,
        SubscriptionStatusEnum.ACTIVE,
      );

      const payment = await this.paymentService.initialSubscription(
        result.transactions[0].amount.total,
        result.create_time,
        PaymentMethodEnum.PAYPAL,
        TransacationTypeEnum.INCOMING,
        result.transactions[0].description,
        PaymentStatusEnum.PAID,
        result.id,
        result.payer.payer_info.payer_id,
        user,
        subscription,
      );

      // Creating new Payment & Subscriptions
      return { success: true, payment };
    } catch (error) {
      console.error('error executing paypal payment:', error);
      return { success: false, error: error.message };
    }
  }
}
