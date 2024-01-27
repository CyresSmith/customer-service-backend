import { IWorkingHours } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Action } from './action.entity';
import { Activity } from './activity.entity';
import { Category } from './category.entity';
import { Employee } from './employee.entity';
import { Product } from './product.entity';
import { Resource } from './resource.entity';
import { Service } from './service.entity';

@Entity({ name: 'Company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: 'jsonb', nullable: false })
  phones: string[];

  @Column({ nullable: false })
  address: string;

  @Column({ type: 'jsonb', nullable: true })
  workingHours: IWorkingHours;

  @ManyToMany(() => Activity, activity => activity.companies)
  @JoinTable({
    name: 'company_activity_service',
    joinColumn: {
      name: 'companyId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'activityId',
      referencedColumnName: 'id',
    },
  })
  activities: Activity[];

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Employee, employee => employee.company, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  employees: Employee[];

  @ManyToMany(() => Category, category => category.companies)
  @JoinTable({
    name: 'company_category_service',
    joinColumn: {
      name: 'companyId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @OneToMany(() => Service, service => service.company)
  services: Service[];

  @OneToMany(() => Product, product => product.company)
  products: Product[];

  @OneToMany(() => Resource, resource => resource.company)
  resources: Resource[];

  @OneToMany(() => Action, action => action.company)
  actions: Action[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  images: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
