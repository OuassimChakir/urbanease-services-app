import { Module } from '@nestjs/common';
import { ProvidedServicesController } from './provided-services.controller';
import { ProvidedServicesService } from './provided-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProviderEntity } from '../../migrations/service-provider.entity';
import { ServiceEntity } from '../../migrations/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProviderEntity, ServiceEntity])],
  controllers: [ProvidedServicesController],
  providers: [ProvidedServicesService],
})
export class ProvidedServicesModule {}
