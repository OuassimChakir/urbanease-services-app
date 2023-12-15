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
import { PlanEntity } from './plan.entity';
import { PaymentEntity } from './payment.entity';
import { SubscriptionStatusEnum } from '../subscriptions/subscription-status.enum';

@Entity()
export class SubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSubscription: number;

  @Column('datetime', { default: null })
  startDate: string;

  @Column('datetime', { default: null })
  endDate: string;

  @Column('varchar', { length: 50 })
  status: SubscriptionStatusEnum;

  @ManyToOne(() => ClientEntity, (client) => client.subscriptions)
  @JoinColumn({ name: 'idClient' })
  client: ClientEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.subscriptions)
  @JoinColumn({ name: 'idPlan' })
  plan: PlanEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.subscription)
  @JoinColumn({ name: 'idSubscription' })
  payments: PaymentEntity[];
}
