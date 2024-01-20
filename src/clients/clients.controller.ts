import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { NewClientDto } from './dto/NewClient.dto';
import { CreateNewUserDto } from '../auth/dto/CreateNewUser.dto';
import { ClientsService } from './clients.service';
import { ClientEntity } from '../migrations/client.entity';
import { UpdateClientDto } from './dto/UpdateClient.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../migrations/user.entity';

@Controller('clients')
@UseGuards(AuthGuard())
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
  clientsList(@GetUser() user: UserEntity): Promise<ClientEntity[]> {
    if (user.isAdmin == 2 || user.isAdmin == 3) {
      throw new UnauthorizedException('Unauthorized!');
    }
    return this.clientsService.getClients();
  }

  @Get(':idClient')
  clientProfil(
    @Param('idClient') idClient: number,
    @GetUser() user: UserEntity,
  ): Promise<ClientEntity> {
    if (user.isAdmin == 3) {
      throw new UnauthorizedException('Unauthorized!');
    }
    return this.clientsService.getClient(idClient);
  }

  @Patch(':idClient/update')
  updateClient(
    @Body() updateClientDto: UpdateClientDto,
    @Param('idClient') idClient: number,
    @GetUser() user: UserEntity,
  ): Promise<ClientEntity> {
    if (user.isAdmin == 3) {
      throw new UnauthorizedException('Unauthorized!');
    }
    return this.clientsService.updateClient(updateClientDto, idClient);
  }

  @Delete(':idClient/delete')
  deleteClient(@Param('idClient') idClient: number): Promise<string> {
    return this.clientsService.deleteClient(idClient);
  }
}
