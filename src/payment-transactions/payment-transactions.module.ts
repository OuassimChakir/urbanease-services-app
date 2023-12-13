import { Module } from '@nestjs/common';
import { PaymentTransactionsController } from './payment-transactions.controller';
import { PaymentTransactionsService } from './payment-transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../migrations/payment.entity';
import { UserEntity } from '../migrations/user.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, UserEntity, SubscriptionEntity]),
  ],
  controllers: [PaymentTransactionsController],
  providers: [PaymentTransactionsService],
})
export class PaymentTransactionsModule {}
