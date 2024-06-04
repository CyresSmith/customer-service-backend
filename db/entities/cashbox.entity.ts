import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'Cashbox' })
export class Cashbox {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    balance: number;

    @ManyToOne(() => Employee, employee => employee.cashboxes, {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    responsible: Employee;

    @ManyToOne(() => Company, company => company.cashboxes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    company: Company;

    @OneToMany(() => Transaction, transaction => transaction.cashbox, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    transactions: Transaction[];

    @Column({ nullable: false, default: true })
    isOpen: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
