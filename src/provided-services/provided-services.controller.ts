import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ProvidedServicesService } from './provided-services.service';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Controller('provided-services')
export class ProvidedServicesController {
  constructor(private providedServiceService: ProvidedServicesService) {}

  @Post(':idServiceProvider')
  addServicesToProvider(
    @Param('idServiceProvider') idServiceProvider: number,
    @Body('serviceIds') serviceIds: number[],
  ): Promise<ServiceProviderEntity> {
    return this.providedServiceService.addServicesToProvider(
      idServiceProvider,
      serviceIds,
    );
  }

  @Delete(':idServiceProvider/delete')
  deleteServicesFromProvider(
    @Param('idServiceProvider') id: number,
  ): Promise<ServiceProviderEntity> {
    return this.providedServiceService.deleteServicesFromProvider(id);
  }
}
