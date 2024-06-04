import { EventTime } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Service } from './service.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'Event' })
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, company => company.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'companyId' })
    @Index()
    company: Company;

    @ManyToOne(() => Client, client => client.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    client: Client;

    @ManyToOne(() => Employee, employee => employee.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    employee: Employee;

    @ManyToMany(() => Service, service => service.events)
    @JoinTable({
        name: 'event_services',
        joinColumn: {
            name: 'services',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'events',
            referencedColumnName: 'id',
        },
    })
    services: Service[];

    @Column({ nullable: false })
    year: number;

    @Column({ nullable: false })
    month: number;

    @Column({ nullable: false })
    day: number;

    @Column({
        type: 'jsonb',
    })
    time: EventTime;

    @Column({ nullable: false })
    duration: number;

    @Column({ nullable: true, default: '' })
    comments: string;

    @OneToOne(() => Transaction, transaction => transaction.event, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    transaction: Transaction;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
