import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobEntity } from './job.entity';
import { PlanItemsEntity } from './plan-items.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity()
export class PlanEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPlan: number;

  @Column('varchar', { length: 50 })
  planName: string;

  @Column('double')
  price: number;

  @ManyToMany(() => JobEntity)
  @JoinTable()
  jobs: JobEntity[];

  @OneToMany(() => PlanItemsEntity, (planItem) => planItem.plan)
  planItems: PlanItemsEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.plan)
  subscriptions: SubscriptionEntity[];
}
