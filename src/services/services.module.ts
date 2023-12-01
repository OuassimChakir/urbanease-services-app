import { Module } from '@nestjs/common';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [ServiceCategoriesModule],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
