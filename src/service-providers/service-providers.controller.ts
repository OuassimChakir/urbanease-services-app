import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServiceProvidersService } from './service-providers.service';
import { CreateNewUserDto } from '../auth/dto/CreateNewUser.dto';
import { NewServiceProviderDto } from './dto/NewServiceProvider.dto';
import { UpdateServiceProviderDto } from './dto/UpdateServiceProvider.dto';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { UpdateServiceProviderStatusDto } from './dto/updateServiceProviderStatus.dto';

@Controller('service-providers')
export class ServiceProvidersController {
  constructor(private serviceProviderService: ServiceProvidersService) {}

  @Post('/new')
  createServiceProvide(
    @Body() createServiceProviderUser: CreateNewUserDto,
    @Body() newServiceProvider: NewServiceProviderDto,
  ) {
    return this.serviceProviderService.addServiceProvider(
      createServiceProviderUser,
      newServiceProvider,
    );
  }

  @Patch(':idServiceProvider/update')
  updateServiceProvider(
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
    @Param('idServiceProvider') idServiceProvider: number,
  ): Promise<ServiceProviderEntity> {
    return this.serviceProviderService.updateServiceProvider(
      updateServiceProviderDto,
      idServiceProvider,
    );
  }

  @Delete(':idServiceProvider/delete')
  deleteServiceProvider(
    @Param('idServiceProvider') idServiceProvider: number,
  ): Promise<string> {
    return this.serviceProviderService.deleteServiceProvider(idServiceProvider);
  }

  @Get('/')
  serviceProvidersList(): Promise<ServiceProviderEntity[]> {
    return this.serviceProviderService.getServiceProviders();
  }

  @Get('/:idServiceProvider')
  serviceProviderProfil(
    @Param('idServiceProvider') idServiceProvider: number,
  ): Promise<ServiceProviderEntity> {
    return this.serviceProviderService.getServiceProvider(idServiceProvider);
  }

  @Patch('/:idServiceProvider/updateStatus')
  updateStatus(
    @Body() updateServiceProviderStatusDto: UpdateServiceProviderStatusDto,
    @Param('idServiceProvider') idServiceProvider: number,
  ) {
    const { etat } = updateServiceProviderStatusDto;
    return this.serviceProviderService.updateServiceProviderStatus(
      idServiceProvider,
      etat,
    );
  }
}
