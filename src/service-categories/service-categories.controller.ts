import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServiceCategoriesService } from './service-categories.service';
import { ServiceCategoryEntity } from '../migrations/service-category.entity';

@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(
    private readonly serviceCategoriesService: ServiceCategoriesService,
  ) {}

  @Get('/')
  async getAllServiceCategories(): Promise<ServiceCategoryEntity[]> {
    return await this.serviceCategoriesService.getAllServiceCategories();
  }

  @Get('/:id')
  async getServiceCategoryById(
    @Param('id') id: number,
  ): Promise<ServiceCategoryEntity> {
    return await this.serviceCategoriesService.getServiceCategoryById(id);
  }

  @Post('/new')
  async createServiceCategory(
    @Body() serviceCategory: ServiceCategoryEntity,
  ): Promise<ServiceCategoryEntity> {
    return await this.serviceCategoriesService.createServiceCategory(
      serviceCategory,
    );
  }

  @Put('/:id/update')
  async updateServiceCategory(
    @Param('id') id: number,
    @Body() serviceCategory: ServiceCategoryEntity,
  ): Promise<ServiceCategoryEntity> {
    return await this.serviceCategoriesService.updateServiceCategory(
      id,
      serviceCategory,
    );
  }

  @Delete('/:id/delete')
  async deleteServiceCategory(@Param('id') id: number): Promise<void> {
    await this.serviceCategoriesService.deleteServiceCategory(id);
  }
}
