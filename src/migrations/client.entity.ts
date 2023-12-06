/* eslint-disable */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RatingEntity } from './rating.entity';
import { JobEntity } from './job.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity()
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idClient: number;

  @Column('timestamp')
  dateJointure: string;

  @ManyToOne(() => UserEntity, (user) => user.clients)
  user: UserEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.client)
  ratings: RatingEntity[];

  @OneToMany(() => JobEntity, (job) => job.client)
  jobs: JobEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.client)
  subscriptions: SubscriptionEntity[];
}
