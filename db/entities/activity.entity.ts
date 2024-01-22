import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity({ name: 'Activity' })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Company, company => company.id)
  companies: Company[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
