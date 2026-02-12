import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  inviterId: string;

  @Column({ unique: true })
  invitedUserId: string;
}
