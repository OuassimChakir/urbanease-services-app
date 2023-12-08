import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewClientDto } from './dto/NewClient.dto';
import { CreateNewUserDto } from '../auth/dto/CreateNewUser.dto';
import { ClientsService } from './clients.service';
import { ClientEntity } from '../migrations/client.entity';
import { UpdateClientDto } from './dto/UpdateClient.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}
  @Post('new')
  newClient(
    @Body() newUser: CreateNewUserDto,
    @Body() newClient: NewClientDto,
  ): Promise<void> {
    return this.clientsService.newClient(newClient, newUser);
  }

  @Get('/')
  clientsList(): Promise<ClientEntity[]> {
    return this.clientsService.getClients();
  }

  @Get(':idClient')
  clientProfil(@Param('idClient') idClient: number): Promise<ClientEntity> {
    return this.clientsService.getClient(idClient);
  }

  @Patch(':idClient/update')
  updateClient(
    @Body() updateClientDto: UpdateClientDto,
    @Param('idClient') idClient: number,
  ): Promise<ClientEntity> {
    return this.clientsService.updateClient(updateClientDto, idClient);
  }

  @Delete(':idClient/delete')
  deleteClient(@Param('idClient') idClient: number): Promise<string> {
    return this.clientsService.deleteClient(idClient);
  }
}
