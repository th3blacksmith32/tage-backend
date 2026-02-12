import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  taskId: string;

  @Column({ type: 'timestamptz' })
  startedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  claimedAt: Date;
}
