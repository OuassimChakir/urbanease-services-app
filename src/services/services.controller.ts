import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceEntity } from '../migrations/service.entity';
import { NewServiceDto } from './dto/NewService.dto';
import { UpdateServiceDto } from './dto/UpdateService.dto';
import { ServiceCategoryEntity } from '../migrations/service-category.entity';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get('/')
  getServices(
    @Query('category') idServiceCategory?: number,
  ): Promise<ServiceEntity[]> {
    if (idServiceCategory)
      return this.servicesService.getServicesByCategory(idServiceCategory);
    else return this.servicesService.getServices();
  }

  @Get('/:idService')
  getService(@Param('idService') idService: number): Promise<ServiceEntity> {
    return this.servicesService.getService(idService);
  }

  @Post('/new')
  createService(@Body() newServiceDto: NewServiceDto): Promise<ServiceEntity> {
    return this.servicesService.createService(newServiceDto);
  }

  @Patch('/:idService/update')
  updateService(
    @Body() updateServiceDto: UpdateServiceDto,
    @Param('idService') idService: number,
  ): Promise<string> {
    return this.servicesService.updateService(idService, updateServiceDto);
  }

  @Delete('/:idService/delete')
  deleteService(@Param('idService') idService: number): Promise<string> {
    return this.servicesService.deleteService(idService);
  }
}
