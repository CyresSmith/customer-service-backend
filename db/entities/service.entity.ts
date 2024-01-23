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
import { Category } from './category.entity';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Resource } from './resource.entity';

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
  images: string[];

  @ManyToOne(() => Category, category => category.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  @Index()
  category: Category;

  @ManyToMany(() => Employee, employee => employee.services, {
    onUpdate: 'CASCADE',
  })
  employees: Employee[];

  @ManyToMany(() => Resource, resource => resource.services, {
    onUpdate: 'CASCADE',
  })
  resources: Resource[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
