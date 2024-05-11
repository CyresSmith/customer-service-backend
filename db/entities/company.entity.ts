import { IWorkingHours } from 'src/common/types';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Action } from './action.entity';
import { Activity } from './activity.entity';
import { Category } from './category.entity';
import { Client } from './client.entity';
import { Employee } from './employee.entity';
import { Product } from './product.entity';
import { Resource } from './resource.entity';
import { Service } from './service.entity';
import { ServiceCategory } from './serviceCategory.entity';
import { Event } from './event.entity';

@Entity({ name: 'Company' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ type: 'jsonb', nullable: false })
    phones: string[];

    @Column({ nullable: false })
    address: string;

    @Column({
        type: 'jsonb',
        nullable: true,
        default: null,
    })
    workingHours: IWorkingHours | null;

    @ManyToMany(() => Activity, activity => activity.companies)
    @JoinTable({
        name: 'company_activity_service',
        joinColumn: {
            name: 'companyId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'activityId',
            referencedColumnName: 'id',
        },
    })
    activities: Activity[];

    @Column({ nullable: true })
    desc: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Employee, employee => employee.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    employees: Employee[];

    @ManyToOne(() => Category, category => category.companies)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => ServiceCategory, serviceCategory => serviceCategory.company)
    servicesCategories: ServiceCategory[];

    @OneToMany(() => Service, service => service.company)
    services: Service[];

    @OneToMany(() => Product, product => product.company)
    products: Product[];

    @OneToMany(() => Resource, resource => resource.company)
    resources: Resource[];

    @OneToMany(() => Action, action => action.company)
    actions: Action[];

    @OneToMany(() => Client, client => client.company)
    clients: Client[];

    @OneToMany(() => Event, event => event.company)
    events: Event[];

    @Column({ type: 'jsonb', nullable: true, default: [] })
    images: string[];

    @Column()
    employeesCount: string;

    @Column()
    branches: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
