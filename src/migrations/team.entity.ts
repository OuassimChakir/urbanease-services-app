import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceProviderEntity } from './service-provider.entity';
import { ServiceProvidersService } from '../service-providers/service-providers.service';
import { JobEntity } from './job.entity';

@Entity()
export class TeamEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTeam: number;

  @ManyToMany(() => ServiceProviderEntity)
  @JoinTable()
  serviceProviders: ServiceProvidersService[];

  @OneToMany(() => JobEntity, (job) => job.team)
  jobs: JobEntity[];
}
