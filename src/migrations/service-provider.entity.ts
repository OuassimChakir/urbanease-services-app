/* eslint-disable */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RatingEntity } from './rating.entity';
import { ServiceEntity } from './service.entity';
import { ServiceProvidersService } from '../service-providers/service-providers.service';

@Entity()
export class ServiceProviderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idServiceProvider: number;

  @Column('timestamp')
  cnie: string;

  @Column('tinyint')
  etat: number;

  @ManyToOne(() => UserEntity, (user) => user.serviceProviders)
  user: UserEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.serviceProvider)
  @JoinColumn()
  ratings: RatingEntity[];

  @ManyToMany(() => ServiceEntity)
  @JoinTable()
  services: ServiceEntity[];
}
