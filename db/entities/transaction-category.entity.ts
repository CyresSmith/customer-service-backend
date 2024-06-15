import { TransactionType } from 'src/common/types';
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
import { Transaction } from './transaction.entity';

@Entity({ name: 'TransactionCategory' })
export class TransactionCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    type: TransactionType;

    @OneToMany(() => Transaction, transaction => transaction.category, { nullable: true })
    transactions: Transaction[];

    @ManyToOne(() => Company, Company => Company.transactionCategories, { nullable: true })
    @JoinColumn({ name: 'companyId' })
    company: Company;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
