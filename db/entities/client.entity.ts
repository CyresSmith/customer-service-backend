import { Gender } from 'src/common/types';
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
import { Company } from './company.entity';

@Entity({ name: 'Client' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true, default: '' })
  lastName: string;

  @Column({ nullable: true, default: '' })
  avatar: string;

  @Column({ nullable: true, default: '' })
  birthday: string;

  @Column({ nullable: true, default: '' })
  gender: Gender;

  @Column({ type: 'int', nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true, default: '' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Company, company => company.clients)
  @JoinColumn({ name: 'companyId' })
  @Index()
  company: Company;
}
