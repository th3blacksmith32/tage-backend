import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Task } from './task.entity';

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task;

  @CreateDateColumn()
  claimedAt: Date;
}