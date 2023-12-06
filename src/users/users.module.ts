import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../migrations/user.entity';
import { ClientEntity } from '../migrations/client.entity';
import { PaymentEntity } from '../migrations/payment.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ClientEntity,
      PaymentEntity,
      ServiceProviderEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
