import { TransactionType } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({ name: 'TransactionCategory' })
export class TransactionCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    type: TransactionType;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
