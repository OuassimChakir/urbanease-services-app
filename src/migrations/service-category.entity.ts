import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceEntity } from './service.entity';

@Entity()
export class ServiceCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idServiceCategory: number;

  @Column('varchar', { length: 100 })
  categoryName: string;

  @Column('text', { nullable: true })
  categoryDescription: string;

  @ManyToOne(() => ServiceEntity, (service) => service.serviceCategory)
  @JoinColumn()
  services: ServiceEntity[];
}
