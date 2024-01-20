import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../migrations/user.entity';
import { Repository } from 'typeorm';
import { CreateNewUserDto } from './dto/CreateNewUser.dto';
import * as bcrypt from 'bcrypt';
import { AuthentificationDto } from './dto/Authentification.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(createNewUser: CreateNewUserDto) {
    const {
      prenom,
      nom,
      email,
      password,
      profilePicture,
      phoneNumber,
      isAdmin,
    } = createNewUser;

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
  }

  async signIn(authDto: AuthentificationDto): Promise<{ accessToken: string }> {
    const { email, password } = authDto;
    const user = await this.userRepo.findOneBy({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials!');
    }
  }
}
