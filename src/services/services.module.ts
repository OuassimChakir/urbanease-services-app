import { Module } from '@nestjs/common';
import { ServiceCategoriesModule } from '../service-categories/service-categories.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../migrations/service.entity';
import { JobEntity } from '../migrations/job.entity';
import { ServiceCategoryEntity } from '../migrations/service-category.entity';

@Module({
  imports: [
    ServiceCategoriesModule,
    TypeOrmModule.forFeature([ServiceEntity, JobEntity, ServiceCategoryEntity]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
