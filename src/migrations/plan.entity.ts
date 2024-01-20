import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobEntity } from './job.entity';
import { PlanItemsEntity } from './plan-items.entity';
import { SubscriptionEntity } from './subscription.entity';
import { ServiceEntity } from './service.entity';

@Entity()
export class PlanEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPlan: number;

  @Column('varchar', { length: 50 })
  planName: string;

  @Column('double')
  price: number;

  @Column('tinyint')
  planType: number;

  @OneToMany(() => JobEntity, (jobItem) => jobItem.plan)
  jobs: JobEntity[];

  @OneToMany(() => PlanItemsEntity, (planItem) => planItem.plan)
  planItems: PlanItemsEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.plan)
  subscriptions: SubscriptionEntity[];

  @ManyToOne(() => ServiceEntity, (service) => service.plans)
  service: ServiceEntity;
}
