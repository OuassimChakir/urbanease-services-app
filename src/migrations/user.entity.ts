import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { ServiceProviderEntity } from './service-provider.entity';
import { PaymentEntity } from './payment.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column('varchar', { length: 50 })
  prenom: string;

  @Column('varchar', { length: 50 })
  nom: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('varchar', { length: 200 })
  password: string;

  @Column('text', { nullable: true })
  profilePicture: string;

  @Column('varchar', { length: 200, nullable: true })
  adresse: string;

  @Column('varchar', { length: 20, nullable: true })
  phoneNumber: string;

  @Column('tinyint', { default: null, nullable: true })
  isAdmin: number;

  @OneToMany(() => ClientEntity, (client) => client.user)
  clients: ClientEntity[];

  @OneToMany(
    () => ServiceProviderEntity,
    (serviceProvider) => serviceProvider.user,
  )
  serviceProviders: ServiceProviderEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payments: PaymentEntity[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  delete_at: string;
}
