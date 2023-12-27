import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../migrations/job.entity';
import { ClientEntity } from '../migrations/client.entity';
import { TeamEntity } from '../migrations/team.entity';
import { ServiceEntity } from '../migrations/service.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { TeamsService } from '../teams/teams.service';
import { PlanEntity } from '../migrations/plan.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { PaymentEntity } from '../migrations/payment.entity';
import { PlanItemsEntity } from '../migrations/plan-items.entity';
import { UserEntity } from '../migrations/user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PaypalService } from '../paypal/paypal.service';
import { PricingPlansService } from '../pricing-plans/pricing-plans.service';
import { PaymentTransactionsService } from '../payment-transactions/payment-transactions.service';
import { ClientsService } from '../clients/clients.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobEntity,
      ClientEntity,
      TeamEntity,
      ServiceEntity,
      ServiceProviderEntity,
      PlanEntity,
      SubscriptionEntity,
      PaymentEntity,
      PlanItemsEntity,
      ServiceEntity,
      UserEntity,
    ]),
  ],
  controllers: [JobsController],
  providers: [
    JobsService,
    TeamsService,
    SubscriptionsService,
    PaypalService,
    PricingPlansService,
    PaymentTransactionsService,
    ClientsService,
    UserService,
  ],
})
export class JobsModule {}
