import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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
    @JoinColumn({ name: 'responsibleId' })
    responsible: Employee;

    @Column({ nullable: false, default: '' })
    comment: string;

    @ManyToOne(() => Company, company => company.cashboxes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @OneToMany(() => Transaction, transaction => transaction.cashbox, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    transactions: Transaction[];

    @OneToMany(() => Transaction, transaction => transaction.toCashboxId, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    incomingMovement: Transaction[];

    @Column({ nullable: false, default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
