import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Company } from './company.entity';

@Entity({ name: 'Product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  desc: string;

  @ManyToOne(() => Company, company => company.products)
  @JoinColumn({ name: 'companyId' })
  @Index()
  company: Company;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  images: string[];

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'categoryId' })
  @Index()
  category: Category;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ nullable: false })
  @Index()
  article: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
