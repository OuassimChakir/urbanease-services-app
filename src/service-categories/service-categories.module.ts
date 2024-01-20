import { Module } from '@nestjs/common';
import { ServiceCategoriesController } from './service-categories.controller';
import { ServiceCategoriesService } from './service-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategoryEntity } from '../migrations/service-category.entity';
import { ServiceEntity } from '../migrations/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategoryEntity, ServiceEntity])],
  controllers: [ServiceCategoriesController],
  providers: [ServiceCategoriesService],
})
export class ServiceCategoriesModule {}
