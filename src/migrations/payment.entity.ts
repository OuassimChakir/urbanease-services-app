import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPayment: number;

  @Column('double')
  amount: number;

  @Column('timestamp', { nullable: true })
  paymentDate: string;

  @Column('varchar', { length: 50, nullable: true })
  paymentMethod: string;

  @Column('varchar', { length: 50 })
  transactionType: string;

  @ManyToOne(() => UserEntity, (user) => user.payments)
  user: UserEntity;
}
