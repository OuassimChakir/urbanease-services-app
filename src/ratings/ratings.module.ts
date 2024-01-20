import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './ratings.controller';
import { RatingService } from './ratings.service';
import { RatingEntity } from '../migrations/rating.entity';
import { ClientEntity } from '../migrations/client.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { JobEntity } from '../migrations/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RatingEntity,
      ClientEntity,
      ServiceProviderEntity,
      JobEntity,
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
