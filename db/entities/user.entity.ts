import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { Employee } from './employee.entity';
import { Message } from './message.entity';

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

    @ManyToMany(() => Channel, channel => channel.users)
    channels: Channel[];

    @OneToMany(() => Message, message => message.from)
    messages: Message[];

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({ default: false })
    isOnline: boolean;

    @Column({ default: false })
    verify: boolean;

    @Column()
    verificationCode: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
