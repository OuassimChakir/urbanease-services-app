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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './migrations/client.entity';
import { JobEntity } from './migrations/job.entity';
import { PaymentEntity } from './migrations/payment.entity';
import { PlanEntity } from './migrations/plan.entity';
import { PlanItemsEntity } from './migrations/plan-items.entity';
import { RatingEntity } from './migrations/rating.entity';
import { ServiceEntity } from './migrations/service.entity';
import { ServiceCategoryEntity } from './migrations/service-category.entity';
import { ServiceProviderEntity } from './migrations/service-provider.entity';
import { SubscriptionEntity } from './migrations/subscription.entity';
import { TeamEntity } from './migrations/team.entity';
import { UserEntity } from './migrations/user.entity';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'urbanease',
      // entities: [
      //   ClientEntity,
      //   JobEntity,
      //   PaymentEntity,
      //   PlanEntity,
      //   PlanItemsEntity,
      //   RatingEntity,
      //   ServiceEntity,
      //   ServiceCategoryEntity,
      //   ServiceProviderEntity,
      //   SubscriptionEntity,
      //   TeamEntity,
      //   UserEntity,
      // ],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}
