import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { ServiceEntity } from './service.entity';
import { TeamEntity } from './team.entity';

@Entity()
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idJob: number;

  @Column('timestamp', { default: null })
  jobStart: string;

  @Column('timestamp', { default: null })
  jobEnd: string;

  @Column('tinyint')
  status: number;

  @Column('varchar', { nullable: true, length: 50 })
  jobType: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('double')
  price: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  update_at: string;

  @DeleteDateColumn()
  delete_at: string;

  @ManyToOne(() => ClientEntity, (client) => client.jobs, { nullable: true })
  @JoinColumn({ name: 'idClient' })
  client: ClientEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.jobs)
  @JoinColumn({ name: 'idService' })
  service: ServiceEntity;

  @ManyToOne(() => TeamEntity, (team) => team.jobs, { nullable: true })
  @JoinColumn({ name: 'idTeam' })
  team: TeamEntity;
}
