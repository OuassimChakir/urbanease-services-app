import { Module } from '@nestjs/common';
import { ServiceProvidersController } from './service-providers.controller';
import { ServiceProvidersService } from './service-providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { RatingEntity } from '../migrations/rating.entity';
import { ProvidedServicesModule } from '../provided-services/provided-services.module';
import { UserEntity } from '../migrations/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceProviderEntity, RatingEntity, UserEntity]),
    ProvidedServicesModule,
  ],
  controllers: [ServiceProvidersController],
  providers: [ServiceProvidersService],
})
export class ServiceProvidersModule {}
