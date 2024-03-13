import { EmployeesServiceSettings, ServiceType } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Resource } from './resource.entity';
import { ServiceCategory } from './serviceCategory.entity';

@Entity({ name: 'Service' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Company, company => company.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  @Index()
  company: Company;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: true })
  break: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  employeesSettings: EmployeesServiceSettings[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  images: string[];

  @ManyToOne(() => ServiceCategory, category => category.services, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  @Index()
  category: ServiceCategory;

  @ManyToMany(() => Employee, employee => employee.services, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  employees: Employee[];

  @ManyToMany(() => Resource, resource => resource.services, {
    onUpdate: 'CASCADE',
  })
  resources: Resource[];

  @Column({ nullable: false, default: 'individual' })
  type: ServiceType;

  @Column({ nullable: false, default: 1 })
  capacity: number;

  @Column({ nullable: true })
  placeLimit: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
