import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity()
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPayment: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('double')
  amount: number;

  @Column('timestamp', { nullable: true })
  paymentDate: string;

  @Column('varchar', { length: 50, nullable: true })
  paymentMethod: string;

  @Column('varchar', { length: 50 })
  transactionType: string;

  @Column('tinyint', { default: 0 })
  status: number;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  @JoinColumn({ name: 'idUser' })
  user: UserEntity;

  @ManyToOne(
    () => SubscriptionEntity,
    (subscription) => subscription.payments,
    { nullable: true },
  )
  @JoinColumn({ name: 'idSubscription' })
  subscription: SubscriptionEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;
}
