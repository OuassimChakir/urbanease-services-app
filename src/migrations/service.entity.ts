import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceCategoryEntity } from './service-category.entity';
import { JobEntity } from './job.entity';
import { ServiceProviderEntity } from './service-provider.entity';

@Entity()
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idService: number;

  @Column('varchar', { length: 100 })
  serviceName: string;

  @Column('text', { nullable: true })
  serviceDescription: string;

  @ManyToOne(
    () => ServiceCategoryEntity,
    (serviceCategory) => serviceCategory.services,
  )
  @JoinColumn({ name: 'idServiceCategory' })
  serviceCategory: ServiceCategoryEntity;

  @OneToMany(() => JobEntity, (job) => job.service)
  jobs: JobEntity[];

  @ManyToMany(() => ServiceProviderEntity)
  @JoinTable()
  serviceProviders: ServiceProviderEntity[];
}
