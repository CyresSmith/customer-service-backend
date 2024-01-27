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

@Entity({ name: 'Activity' })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Company, company => company.id)
  companies: Company[];

  @ManyToOne(() => Category, category => category.activities)
  @JoinColumn({ name: 'categoryId' })
  @Index()
  category: Category;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
