import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../migrations/client.entity';
import { RatingEntity } from '../migrations/rating.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { JobEntity } from '../migrations/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      RatingEntity,
      SubscriptionEntity,
      JobEntity,
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
