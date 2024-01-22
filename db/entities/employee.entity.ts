import { EmployeeStatus, JobTitle, Role } from 'src/common/types';
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
import { Category } from './category.entity';
import { Company } from './company.entity';
import { Schedule } from './schedule.entity';
import { Service } from './service.entity';
import { User } from './user.entity';

@Entity({ name: 'Employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.employees)
  @JoinColumn({ name: 'userId' })
  @Index()
  user: User;

  @Column({ nullable: true })
  jobTitle: JobTitle;

  @ManyToOne(() => Category, category => category.employees)
  @JoinColumn({ name: 'categoryId' })
  @Index()
  category: Category;

  @Column({ nullable: true })
  info: string;

  @Column({ default: false })
  provider: boolean;

  @Column({ default: 'working' })
  status: EmployeeStatus;

  @Column({ nullable: false, default: 'user' })
  role: Role;

  @ManyToOne(() => Company, company => company.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  @Index()
  company: Company;

  @OneToMany(() => Action, action => action.employee)
  actions: Action[];

  @OneToMany(() => Schedule, schedule => schedule.employees)
  schedules: Schedule[];

  @ManyToMany(() => Service, service => service.employees)
  @JoinTable({
    name: 'employee_services_service',
    joinColumn: {
      name: 'employeeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'serviceId',
      referencedColumnName: 'id',
    },
  })
  services: Service[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
