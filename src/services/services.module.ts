import { Module } from '@nestjs/common';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';

@Module({
  imports: [ServiceCategoriesModule]
})
export class ServicesModule {}
