import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../migrations/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  async getUser(idUser: number) {
    const user = await this.userRepo.findOneBy({ idUser: idUser });
    if (user) {
      return user;
    } else {
      throw new NotFoundException(`USER ID ${idUser} NOT FOUND!`);
    }
  }
}
