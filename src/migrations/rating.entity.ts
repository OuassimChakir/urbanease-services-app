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
import { SubscriptionEntity } from './subscription.entity';

@Entity()
export class RatingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idRating: number;

  @Column('tinyint')
  rating: number;

  @Column('text')
  reviewTest: string;
   
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reviewDate: Date;

 

  @ManyToOne(() => ClientEntity, (client) => client.ratings)
  @JoinColumn({ name: 'idClient' })
  client: ClientEntity;

  @ManyToOne(
    () => ServiceProviderEntity,
    (serviceProvider) => serviceProvider.ratings,
  )
  @JoinColumn({ name: 'idServiceProvider' })
  serviceProvider: ServiceProviderEntity;
  
  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.ratings)
  subscription: SubscriptionEntity;

}








 
