import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';

export type ChannelType = 'public' | 'private';

@Entity({ name: 'Message' })
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @ManyToOne(() => User, user => user.messages)
    from: User;

    @Index()
    @ManyToOne(() => Channel, channel => channel.messages)
    channel: Channel;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
