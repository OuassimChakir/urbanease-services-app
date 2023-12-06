import {
  BaseEntity,
  Column,
  Entity,
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
  client: ClientEntity;

  @ManyToOne(
    () => ServiceProviderEntity,
    (serviceProvider) => serviceProvider.ratings,
  )
  serviceProvider: ServiceProviderEntity;
}
