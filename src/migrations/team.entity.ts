import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceProviderEntity } from './service-provider.entity';
import { JobEntity } from './job.entity';

@Entity()
export class TeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTeam: number;

  @ManyToMany(() => ServiceProviderEntity)
  @JoinTable()
  serviceProviders: ServiceProviderEntity[];

  @OneToMany(() => JobEntity, (job) => job.team)
  jobs: JobEntity[];
}
