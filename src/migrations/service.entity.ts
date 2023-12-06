import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceCategoryEntity } from './service-category.entity';
import { JobEntity } from './job.entity';

@Entity()
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idService: number;

  @Column('varchar', { length: 100 })
  serviceName: string;

  @Column('text', { nullable: true })
  serviceDescription: string;

  @OneToMany(
    () => ServiceCategoryEntity,
    (serviceCategory) => serviceCategory.services,
  )
  serviceCategory: ServiceCategoryEntity;

  @OneToMany(() => JobEntity, (job) => job.service)
  jobs: JobEntity[];
}
