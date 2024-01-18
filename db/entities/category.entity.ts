import { CategoryType } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Product } from './product.entity';
import { Service } from './service.entity';

@Entity({ name: 'Category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Company, company => company.categories)
  companies: Company[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: CategoryType;

  @OneToMany(() => Employee, employee => employee.category)
  employees: Employee[];

  @OneToMany(() => Service, service => service.category)
  services: Service[];

  @OneToMany(() => Product, product => product.category)
  product: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
