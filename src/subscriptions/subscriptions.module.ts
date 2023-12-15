import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { ClientEntity } from '../migrations/client.entity';
import { PlanEntity } from '../migrations/plan.entity';
import { PaypalService } from '../paypal/paypal.service';
import { PricingPlansService } from '../pricing-plans/pricing-plans.service';
import { PlanItemsEntity } from '../migrations/plan-items.entity';
import { ServiceEntity } from '../migrations/service.entity';
import { PaymentTransactionsService } from '../payment-transactions/payment-transactions.service';
import { PaymentEntity } from '../migrations/payment.entity';
import { UserEntity } from '../migrations/user.entity';
import { ClientsService } from '../clients/clients.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscriptionEntity,
      ClientEntity,
      PlanEntity,
      PlanItemsEntity,
      ServiceEntity,
      PaymentEntity,
      UserEntity,
    ]),
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    PaypalService,
    PricingPlansService,
    PaymentTransactionsService,
    ClientsService,
    UserService,
  ],
})
export class SubscriptionsModule {}
