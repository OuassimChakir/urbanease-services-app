import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
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
import { AuthModule } from './auth/auth.module';
import { PaypalModule } from './paypal/paypal.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule,
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
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    PaypalModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
