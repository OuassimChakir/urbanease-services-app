import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../migrations/service.entity';
import { Repository } from 'typeorm';
import { NewServiceDto } from './dto/NewService.dto';
import { ServiceCategoryEntity } from '../migrations/service-category.entity';
import { UpdateServiceDto } from './dto/UpdateService.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
    @InjectRepository(ServiceCategoryEntity)
    private serviceCategoryRepo: Repository<ServiceCategoryEntity>,
  ) {}

  async createService(newServiceDto: NewServiceDto): Promise<ServiceEntity> {
    const { serviceName, serviceDescription, idServiceCategory } =
      newServiceDto;

    const serviceCategory: ServiceCategoryEntity =
      await this.serviceCategoryRepo.findOneBy({
        idServiceCategory: idServiceCategory,
      });

    if (!serviceCategory)
      throw new NotFoundException(
        `Service Category ID ${idServiceCategory} Not Found!`,
      );
    const service = this.serviceRepo.create({
      serviceName,
      serviceDescription,
      serviceCategory,
    });
    try {
      await this.serviceRepo.save(service);
      return service;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateService(
    idService: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<string> {
    const { serviceName, serviceDescription, idServiceCategory } =
      updateServiceDto;

    const serviceCategory = await this.serviceCategoryRepo.findOneBy({
      idServiceCategory: idServiceCategory,
    });

    if (!serviceCategory)
      throw new NotFoundException(
        `Service Category ID ${idServiceCategory} Not Found!`,
      );

    const service: ServiceEntity = await this.serviceRepo.findOne({
      where: { idService: idService },
      relations: ['serviceCategory'],
    });

    if (!service)
      throw new NotFoundException(`No Service ID ${idService} has been found!`);

    service.serviceName = serviceName;
    service.serviceDescription = serviceDescription;
    service.serviceCategory = serviceCategory;

    try {
      await this.serviceRepo.save(service);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return 'Service Updated Successfully';
  }

  async deleteService(idService: number): Promise<string> {
    const service: ServiceEntity = await this.serviceRepo.findOneBy({
      idService: idService,
    });

    if (!service)
      throw new NotFoundException(`No Service ID ${idService} has been found!`);

    await this.serviceRepo.remove(service);
    return 'Service Deleted Successfully!';
  }

  async getService(idService: number): Promise<ServiceEntity> {
    const service: ServiceEntity = await this.serviceRepo.findOneBy({
      idService: idService,
    });

    if (!service)
      throw new NotFoundException(`No Service ID ${idService} has been found!`);

    return service;
  }

  async getServices(): Promise<ServiceEntity[]> {
    return await this.serviceRepo.find({
      relations: {
        serviceCategory: true,
      },
    });
  }

  async getServicesByCategory(
    idServiceCategory: number,
  ): Promise<ServiceEntity[]> {
    const serviceCategory = await this.serviceCategoryRepo.findOneBy({
      idServiceCategory: idServiceCategory,
    });

    if (!serviceCategory)
      throw new NotFoundException(
        `Service Category ID ${idServiceCategory} Not Found!`,
      );

    return await this.serviceRepo.find({
      where: { serviceCategory: { idServiceCategory: idServiceCategory } },
      relations: {
        serviceCategory: true,
      },
    });
  }
}
