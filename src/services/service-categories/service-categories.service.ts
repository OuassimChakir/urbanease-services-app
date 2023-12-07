import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategoryEntity } from '../../migrations/service-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategoryEntity)
    private readonly serviceCategoryRepository: Repository<ServiceCategoryEntity>,
  ) {}

  async getAllServiceCategories(): Promise<ServiceCategoryEntity[]> {
    return await this.serviceCategoryRepository.find();
  }

  async getServiceCategoryById(id: number): Promise<ServiceCategoryEntity> {
    return await this.serviceCategoryRepository.findOne({
      where: { idServiceCategory: id },
    });
  }

  async createServiceCategory(
    serviceCategory: ServiceCategoryEntity,
  ): Promise<ServiceCategoryEntity> {
    return await this.serviceCategoryRepository.save(serviceCategory);
  }

  async updateServiceCategory(
    id: number,
    serviceCategory: ServiceCategoryEntity,
  ): Promise<ServiceCategoryEntity> {
    const existingServiceCategory = await this.getServiceCategoryById(id);

    if (!existingServiceCategory) {
      throw new Error('Service category not found');
    }

    existingServiceCategory.categoryName = serviceCategory.categoryName;
    existingServiceCategory.categoryDescription = serviceCategory.categoryDescription;

    return await this.serviceCategoryRepository.save(existingServiceCategory);
  }

  async deleteServiceCategory(id: number): Promise<void> {
    const existingServiceCategory = await this.getServiceCategoryById(id);

    if (!existingServiceCategory) {
      throw new Error('Service category not found');
    }

    await this.serviceCategoryRepository.delete(id);
  }
}