import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action } from './action.entity';
import { Company } from './company.entity';
import { Schedule } from './schedule.entity';
import { Service } from './service.entity';

@Entity({ name: 'Resource' })
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  images: string[];

  @ManyToOne(() => Company, company => company.id)
  @JoinColumn({ name: 'companyId' })
  @Index()
  company: Company;

  @ManyToMany(() => Service, service => service.category)
  @JoinTable({
    name: 'resources_services_service',
    joinColumn: {
      name: 'resourceId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'serviceId',
      referencedColumnName: 'id',
    },
  })
  services: Service[];

  @ManyToMany(() => Action, action => action.resources)
  actions: Action[];

  @OneToMany(() => Schedule, schedule => schedule.employees)
  schedules: Schedule[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
