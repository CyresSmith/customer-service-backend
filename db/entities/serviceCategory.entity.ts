import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Service } from './service.entity';

@Entity({ name: 'serviceCategory' })
export class ServiceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.servicesCategories)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Service, service => service.category)
  services: Service[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
