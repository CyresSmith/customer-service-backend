import { Gender } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity({ name: 'Client' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: '' })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true, default: '' })
  lastName: string;

  @Column({ nullable: true, default: '' })
  avatar: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true, default: '' })
  gender: Gender;

  @Column({ type: 'int', nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true, default: '' })
  comment: string;

  @Column({ nullable: true, default: '' })
  source: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Company, company => company.clients)
  @Index()
  company: Company;
}
