import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { PlanEntity } from './plan.entity';

@Entity()
export class SubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSubscription: number;

  @Column('datetime', { default: null })
  startDate: string;

  @Column('datetime', { default: null })
  endDate: string;

  @ManyToOne(() => ClientEntity, (client) => client.subscriptions)
  client: ClientEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.subscriptions)
  plan: PlanEntity;
}
