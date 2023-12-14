import { Module } from '@nestjs/common';
import { ServiceProvidersController } from './service-providers.controller';
import { ServiceProvidersService } from './service-providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { RatingEntity } from '../migrations/rating.entity';
import { ProvidedServicesModule } from '../provided-services/provided-services.module';
import { UserEntity } from '../migrations/user.entity';
import { PaymentTransactionsService } from '../payment-transactions/payment-transactions.service';
import { PaymentEntity } from '../migrations/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceProviderEntity,
      RatingEntity,
      UserEntity,
      PaymentEntity,
    ]),
    ProvidedServicesModule,
  ],
  controllers: [ServiceProvidersController],
  providers: [ServiceProvidersService, PaymentTransactionsService],
})
export class ServiceProvidersModule {}
