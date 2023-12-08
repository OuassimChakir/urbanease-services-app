import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity()
export class PlanItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPlanItem: number;

  @Column('varchar', { length: 300 })
  item: string;

  @ManyToOne(() => PlanEntity, (plan) => plan.planItems)
  @JoinColumn({ name: 'idPlan' })
  plan: PlanEntity;
}
