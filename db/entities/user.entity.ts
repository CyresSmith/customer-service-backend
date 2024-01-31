import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true, default: '' })
  lastName: string;

  @Column({ nullable: true, default: '' })
  avatar: string;

  @OneToMany(() => Employee, employee => employee.user)
  employees: Employee[];

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ default: false })
  verify: boolean;

  @Column()
  verificationCode: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
