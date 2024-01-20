import { Module } from '@nestjs/common';
import { PaymentTransactionsController } from './payment-transactions.controller';
import { PaymentTransactionsService } from './payment-transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../migrations/payment.entity';
import { UserEntity } from '../migrations/user.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { ServiceProvidersService } from '../service-providers/service-providers.service';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      UserEntity,
      SubscriptionEntity,
      ServiceProviderEntity,
    ]),
  ],
  controllers: [PaymentTransactionsController],
  providers: [PaymentTransactionsService, ServiceProvidersService],
})
export class PaymentTransactionsModule {}
