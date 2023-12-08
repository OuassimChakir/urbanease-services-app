import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { ServiceProviderEntity } from './service-provider.entity';

@Entity()
export class RatingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idRating: number;

  @Column('tinyint')
  rating: number;

  @Column('text')
  reviewTest: string;

  @Column('timestamp')
  reviewDate: string;

  @ManyToOne(() => ClientEntity, (client) => client.ratings)
  @JoinColumn({ name: 'idClient' })
  client: ClientEntity;

  @ManyToOne(
    () => ServiceProviderEntity,
    (serviceProvider) => serviceProvider.ratings,
  )
  @JoinColumn({ name: 'idServiceProvider' })
  serviceProvider: ServiceProviderEntity;
}
