import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: string;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'double precision', default: 0 })
  balance: number;

  @Column({ type: 'double precision', default: 0 })
  totalEarned: number;

  @Column({ nullable: true })
  invitedBy: number;

  @Column({ default: false })
  ageRewardClaimed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}