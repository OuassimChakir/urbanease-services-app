import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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

  @OneToMany(() => ServiceEntity, (service) => service.serviceCategory)
  services: ServiceEntity[];
}
