import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  telegramId: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: false })
  telegramAgeGranted: boolean;

  @Column({ default: 0 })
  telegramAgeReward: number;

  @Column({ nullable: true })
  inviterId: string;
}
