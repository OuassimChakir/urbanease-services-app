import { Module } from '@nestjs/common';
import { PaymentTransactionsController } from './payment-transactions.controller';
import { PaymentTransactionsService } from './payment-transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../migrations/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentTransactionsController],
  providers: [PaymentTransactionsService],
})
export class PaymentTransactionsModule {}
