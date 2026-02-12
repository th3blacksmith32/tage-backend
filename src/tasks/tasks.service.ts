import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTask } from './user-task.entity';
import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(UserTask)
    private repo: Repository<UserTask>,
    private users: UsersService,
    private invites: InvitesService
  ) {}

  async start(userId: string, taskId: string) {
    return this.repo.save({
      userId,
      taskId,
      startedAt: new Date()
    });
  }

  async claim(userId: string, taskId: string, reward: number) {
    const record = await this.repo.findOne({
      where: { userId, taskId }
    });

    if (!record) throw new Error('Task not started');

    const diff = Date.now() - record.startedAt.getTime();
    if (diff < 15000) throw new Error('Cooldown not finished');

    if (record.claimedAt) throw new Error('Already claimed');

    await this.users.addBalance(userId, reward);
    await this.invites.reward(userId, reward);

    record.claimedAt = new Date();
    return this.repo.save(record);
  }
}
