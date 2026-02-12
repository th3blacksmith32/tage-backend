import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'double precision' })
  reward: number;

  @Column()
  url: string;

  @Column({ default: 0 })
  cooldownSeconds: number;
}