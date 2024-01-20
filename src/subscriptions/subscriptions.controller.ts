import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
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
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { PlanTypeEnum } from '../pricing-plans/PlanType.enum';
import { PaymentEntity } from '../migrations/payment.entity';

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

  /*------------------------
  / MONTH Subscriptions
  /----------------------- */
  @Get('/payment/plan/:idPlan')
  @Redirect()
  async paySubscription(@Param('idPlan') idPlan: number) {
    const plan: PlanEntity = await this.planService.getPricingPlan(idPlan);
    const success_url = 'subscriptions/payment/verify';
    const cancel_url = 'subscriptions/payment/verify';
    if (plan.planType == PlanTypeEnum.MONTHLY) {
      const paymentUrl = await this.paypalService.createPayment(
        plan,
        success_url,
        cancel_url,
      );
      return { url: paymentUrl };
    } else {
      throw new NotFoundException('One Time plan or Plan Not Found!');
    }
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
      const credit: number = parseInt(plan.planItems[0].value);

      const subscription: SubscriptionEntity =
        await this.subscriptionService.newSubscription(
          client,
          plan,
          startDate,
          endDate,
          SubscriptionStatusEnum.ACTIVE,
          credit,
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

      return { success: true, payment };
    } catch (error) {
      console.error('error executing paypal payment:', error);
      return { success: false, error: error.message };
    }
  }

  /*------------------------
  / Renew MONTH Subscriptions
  /----------------------- */
  @Get('/renew/:idSubscription')
  @Redirect()
  async renewSubscriptionPayment(
    @Param('idSubscription') idSubscription: number,
  ) {
    const subscription: SubscriptionEntity =
      await this.subscriptionService.getSubscriptionById(idSubscription);
    const plan: PlanEntity = await this.planService.getPricingPlan(
      subscription.plan.idPlan,
    );
    const success_url = 'subscriptions/renew/verify/' + idSubscription;
    const cancel_url = 'subscriptions/renew/verify' + idSubscription;
    if (plan.planType == PlanTypeEnum.MONTHLY) {
      const paymentUrl = await this.paypalService.createPayment(
        plan,
        success_url,
        cancel_url,
      );
      return { url: paymentUrl };
    } else {
      throw new NotFoundException('One Time plan or Plan Not Found!');
    }
  }

  @Get('/renew/verify/:idSubscription')
  async validateRenewSubscription(
    @Param('idSubscription') idSubscription: number,
    @Query('paymentId') paymentId: string,
    @Query('PayerID') payerId: string,
  ) {
    const idUser = 2;
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
      const paredDate: Date = parseISO(startDate);
      const endDate: string = format(
        addDays(paredDate, 30),
        'yyyy-MM-dd HH:mm:ss',
      );
      const credit: number = parseInt(plan.planItems[0].value);

      const subscription: SubscriptionEntity =
        await this.subscriptionService.getSubscriptionById(idSubscription);

      await this.subscriptionService.renewSubscription(
        subscription,
        endDate,
        credit,
      );

      const payment: PaymentEntity =
        await this.paymentService.initialSubscription(
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

      return { success: true, payment };
    } catch (error) {
      console.error('error executing paypal payment:', error);
      return { success: false, error: error.message };
    }
  }
}
