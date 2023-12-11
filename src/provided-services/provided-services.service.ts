import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../migrations/service.entity';

@Injectable()
export class ProvidedServicesService {
  constructor(
    @InjectRepository(ServiceProviderEntity)
    private serviceProviderRepo: Repository<ServiceProviderEntity>,

    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
  ) {}

  async addServicesToProvider(
    idServiceProvider: number,
    servicesIds: number[],
  ): Promise<ServiceProviderEntity> {
    console.log('serviceIds', servicesIds);
    const serviceProvider = await this.serviceProviderRepo.findOne({
      where: { idServiceProvider: idServiceProvider },
      relations: ['services'],
    });

    if (!serviceProvider)
      throw new NotFoundException(
        `Service Provider ID ${idServiceProvider} Not Found!`,
      );

    const services: ServiceEntity[] = await this.serviceRepo.find({
      where: servicesIds.map((idService) => ({ idService })),
    });
    console.log('services', services);

    serviceProvider.services = services;
    try {
      return this.serviceProviderRepo.save(serviceProvider);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteServicesFromProvider(
    idServiceProvider,
  ): Promise<ServiceProviderEntity> {
    const serviceProvider = await this.serviceProviderRepo.findOneBy({
      idServiceProvider: idServiceProvider,
    });

    if (!serviceProvider)
      throw new NotFoundException(
        `Service Provider ID ${idServiceProvider} Not Found!`,
      );

    serviceProvider.services = [];
    return await this.serviceProviderRepo.save(serviceProvider);
  }
}
