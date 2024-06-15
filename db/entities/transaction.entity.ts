import { TransactionType } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Cashbox } from './cashbox.entity';
import { Client } from './client.entity';
import { Company } from './company.entity';
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
    time: number;

    @Column({ nullable: false })
    amount: number;

    @ManyToOne(() => Company, company => company.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'companyId' })
    @Index()
    company: Company;

    @ManyToOne(() => Cashbox, cashbox => cashbox.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'cashboxId' })
    @Index()
    cashbox: Cashbox;

    @ManyToOne(() => Cashbox, cashbox => cashbox.incomingMovement, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'toCashboxId' })
    @Index()
    toCashboxId: Cashbox;

    @ManyToOne(() => Client, client => client.transactions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    client: Client;

    @ManyToMany(() => Employee, employee => employee.transactions)
    @JoinTable({
        name: 'transactions_employees',
        joinColumn: {
            name: 'transactionId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'employeeId',
            referencedColumnName: 'id',
        },
    })
    employees: Employee[];

    @ManyToOne(() => Employee, employee => employee.operations, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'creatorId' })
    @Index()
    creator: Employee;

    @OneToMany(() => Event, event => event.transaction, {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    events: Event[];

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
