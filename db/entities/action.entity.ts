import { ActionType } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Resource } from './resource.entity';

@Entity({ name: 'Action' })
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, company => company.actions)
    @JoinColumn({ name: 'companyId' })
    @Index()
    company: Company;

    @Column({ nullable: true })
    desc: string;

    @Column({ nullable: false })
    type: ActionType;

    @ManyToOne(() => Employee, employee => employee.actions, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToMany(() => Resource, resource => resource.actions)
    @JoinTable({
        name: 'action_resource_service',
        joinColumn: {
            name: 'actionId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'resourceId',
            referencedColumnName: 'id',
        },
    })
    resources: Resource[];

    @Column({ nullable: false })
    date: string;

    @Column({ nullable: false })
    price: string;

    @Column({ type: 'int', default: 0 })
    discount: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
