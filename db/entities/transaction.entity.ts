import { TransactionType } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Cashbox } from './cashbox.entity';
import { Client } from './client.entity';
import { Employee } from './employee.entity';
import { Event } from './event.entity';
import { TransactionCategory } from './transaction-category.entity';

@Entity({ name: 'Transaction' })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    year: number;

    @Column({ nullable: false })
    month: number;

    @Column({ nullable: false })
    day: number;

    @Column({ nullable: false })
    time: string;

    @Column({ nullable: false })
    amount: number;

    @ManyToOne(() => Cashbox, cashbox => cashbox.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'cashboxId' })
    @Index()
    cashbox: Cashbox;

    @ManyToOne(() => Client, client => client.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    client: Client;

    @ManyToOne(() => Employee, employee => employee.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    employee: Employee;

    @ManyToOne(() => Employee, employee => employee.operations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'creatorId' })
    @Index()
    creator: Employee;

    @OneToOne(() => Event, event => event.transaction, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    event: Event;

    @Column({ nullable: false })
    type: TransactionType;

    @ManyToOne(() => TransactionCategory, transactionCategory => transactionCategory.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'categoryId' })
    @Index()
    category: TransactionCategory;

    @Column({ nullable: true, default: '' })
    comments: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
