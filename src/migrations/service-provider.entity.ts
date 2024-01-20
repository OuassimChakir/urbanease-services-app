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
import { Exclude } from 'class-transformer';

@Entity()
export class ServiceProviderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idServiceProvider: number;

  @Column()
  cnie: string;

  @Column('tinyint')
  etat: number;

  @ManyToOne(() => UserEntity, (user) => user.serviceProviders)
  @JoinColumn({ name: 'idUser' })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.serviceProvider)
  ratings: RatingEntity[];

  @ManyToMany(() => ServiceEntity)
  @JoinTable()
  services: ServiceEntity[];
}
