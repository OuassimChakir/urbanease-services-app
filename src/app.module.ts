import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { PaymentTransactionsModule } from './payment-transactions/payment-transactions.module';
import { ServiceProvidersModule } from './service-providers/service-providers.module';
import { TeamsModule } from './teams/teams.module';
import { JobsModule } from './jobs/jobs.module';
import { RatingsModule } from './ratings/ratings.module';
import { ServicesModule } from './services/services.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PricingPlansModule } from './pricing-plans/pricing-plans.module';
import { Tp2Module } from './tp2/tp2.module';

@Module({
  imports: [
    ClientsModule,
    UsersModule,
    PaymentTransactionsModule,
    ServiceProvidersModule,
    TeamsModule,
    JobsModule,
    RatingsModule,
    ServicesModule,
    SubscriptionsModule,
    PricingPlansModule,
    Tp2Module,
  ],
})
export class AppModule {}
