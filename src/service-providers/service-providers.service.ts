import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { Repository } from 'typeorm';
import { NewServiceProviderDto } from './dto/NewServiceProvider.dto';
import { CreateNewUserDto } from '../auth/dto/CreateNewUser.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../migrations/user.entity';
import { UpdateServiceProviderDto } from './dto/UpdateServiceProvider.dto';
import { format } from 'date-fns';
import { ServiceProviderEnum } from './ServiceProvider.enum';

@Injectable()
export class ServiceProvidersService {
  constructor(
    @InjectRepository(ServiceProviderEntity)
    private serviceProviderRepo: Repository<ServiceProviderEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async addServiceProvider(
    createServiceProviderUser: CreateNewUserDto,
    newServiceProvider: NewServiceProviderDto,
  ): Promise<void> {
    const {
      prenom,
      nom,
      email,
      password,
      profilePicture,
      phoneNumber,
      isAdmin,
    } = createServiceProviderUser;
    const { cnie, etat } = newServiceProvider;

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

    const newServicePro: ServiceProviderEntity =
      this.serviceProviderRepo.create({
        cnie,
        etat,
        user,
      });

    try {
      await this.serviceProviderRepo.save(newServicePro);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateServiceProvider(
    updateServiceProvider: UpdateServiceProviderDto,
    idServiceProvider: number,
  ) {
    const { prenom, nom, email, profilePicture, phoneNumber, cnie } =
      updateServiceProvider;

    const serviceProvider: ServiceProviderEntity =
      await this.serviceProviderRepo.findOne({
        where: { idServiceProvider: idServiceProvider },
        relations: ['user'],
      });

    if (!serviceProvider)
      throw new NotFoundException(
        `Service Provider ID ${idServiceProvider} not found!`,
      );

    serviceProvider.user.prenom = prenom;
    serviceProvider.user.nom = nom;
    serviceProvider.user.email = email;
    serviceProvider.user.profilePicture = profilePicture;
    serviceProvider.user.phoneNumber = phoneNumber;
    serviceProvider.cnie = cnie;
    serviceProvider.user.updated_at = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    return await this.serviceProviderRepo.save(serviceProvider);
  }

  async deleteServiceProvider(idServiceProvider: number): Promise<string> {
    const serviceProvider: ServiceProviderEntity =
      await this.serviceProviderRepo.findOne({
        where: { idServiceProvider: idServiceProvider },
        relations: ['user'],
      });

    if (!serviceProvider)
      throw new NotFoundException(
        `Service Provider ID ${idServiceProvider} not found!`,
      );

    await this.serviceProviderRepo.remove(serviceProvider);
    return 'Service Provider has been deleted successfully!';
  }

  async getServiceProviders(): Promise<ServiceProviderEntity[]> {
    return await this.serviceProviderRepo.find();
  }

  async getServiceProvider(
    idServiceProvider: number,
  ): Promise<ServiceProviderEntity> {
    try {
      return await this.serviceProviderRepo.findOneBy({
        idServiceProvider: idServiceProvider,
      });
    } catch (error) {
      throw new NotFoundException(
        `Service Provider ID ${idServiceProvider} Not Found!`,
      );
    }
  }

  async updateServiceProviderStatus(
    idServiceProvider: number,
    etat: ServiceProviderEnum,
  ): Promise<void> {
    const serviceProvider = await this.serviceProviderRepo.findOneBy({
      idServiceProvider: idServiceProvider,
    });
    if (!serviceProvider)
      throw new NotFoundException(
        `Service Provider ID ${idServiceProvider} Not Found!`,
      );
    serviceProvider.etat = etat;

    await this.serviceProviderRepo.save(serviceProvider);
  }
}
