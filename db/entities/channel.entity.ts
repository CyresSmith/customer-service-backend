import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

export type ChannelType = 'public' | 'private';

@Entity({ name: 'Channel' })
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: '' })
    name: string;

    @Column({ nullable: true, default: '' })
    avatar: string;

    @Column({ nullable: false })
    type: ChannelType;

    @ManyToMany(() => User, user => user.channels)
    @JoinTable({
        name: 'users_channels',
        joinColumn: {
            name: 'channelId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    })
    users: User[];

    @ManyToOne(() => Company, company => company.channels)
    company: Company;

    @OneToMany(() => Message, message => message.channel)
    messages: Message[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
