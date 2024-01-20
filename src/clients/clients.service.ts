import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../migrations/client.entity';
import { Repository } from 'typeorm';
import { NewClientDto } from './dto/NewClient.dto';
import { CreateNewUserDto } from '../auth/dto/CreateNewUser.dto';
import { UserEntity } from '../migrations/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateClientDto } from './dto/UpdateClient.dto';
import { format } from 'date-fns';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async newClient(
    client: NewClientDto,
    clientUser: CreateNewUserDto,
  ): Promise<void> {
    const { prenom, nom, email, password, profilePicture, phoneNumber } =
      clientUser;
    const isAdmin = 2;
    const { dateJointure } = client;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: UserEntity = this.userRepo.create({
      prenom,
      nom,
      email,
      password: hashedPassword,
      profilePicture,
      phoneNumber,
      isAdmin,
    });

    try {
      await this.userRepo.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Username Already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
    const newClient: ClientEntity = this.clientRepo.create({
      dateJointure,
      user,
    });

    try {
      await this.clientRepo.save(newClient);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getClients(): Promise<ClientEntity[]> {
    return await this.clientRepo.find({
      relations: {
        user: true,
      },
    });
  }

  async getClient(idClient: number): Promise<ClientEntity> {
    return await this.clientRepo.findOne({
      where: {
        idClient: idClient,
      },
      relations: {
        user: true,
      },
    });
  }

  async getClientByUser(idUser: number): Promise<ClientEntity> {
    return await this.clientRepo.findOne({
      where: {
        user: { idUser: idUser },
      },
    });
  }

  async updateClient(
    updateClientDto: UpdateClientDto,
    idClient: number,
  ): Promise<ClientEntity> {
    const { prenom, nom, email, profilePicture, phoneNumber } = updateClientDto;
    const updatedClient: ClientEntity = await this.clientRepo.findOne({
      where: { idClient: idClient },
      relations: ['user'],
    });
    if (!updatedClient) {
      throw new NotFoundException(`Client of id: ${idClient} not Found!`);
    }
    updatedClient.user.prenom = prenom;
    updatedClient.user.nom = nom;
    updatedClient.user.email = email;
    updatedClient.user.profilePicture = profilePicture;
    updatedClient.user.phoneNumber = phoneNumber;
    updatedClient.user.updated_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    return await this.clientRepo.save(updatedClient);
  }

  async deleteClient(idClient: number): Promise<string> {
    const client: ClientEntity = await this.clientRepo.findOne({
      where: { idClient: idClient },
      relations: ['user'],
    });

    if (!client) {
      console.log('hello');
      throw new NotFoundException(`Client of id: ${idClient} not Found!`);
    }

    await this.clientRepo.remove(client);
    return `Client ID ${idClient} has been deleted successfully!`;
  }
}
