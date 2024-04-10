import { MonthSchedule, ScheduleType } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Employee } from './employee.entity';
import { Resource } from './resource.entity';

@Entity({ name: 'Schedule' })
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, company => company.id)
    @JoinColumn({ name: 'companyId' })
    @Index()
    company: Company;

    @Column({ nullable: false })
    type: ScheduleType;

    @ManyToOne(() => Employee, employee => employee.schedules, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    employee: Employee;

    @ManyToOne(() => Resource, resource => resource.schedules)
    resource: Resource;

    @Column({ nullable: false })
    year: number;

    @Column({ nullable: false })
    month: number;

    @Column({
        type: 'jsonb',
        nullable: true,
        default: null,
    })
    schedule: MonthSchedule;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
