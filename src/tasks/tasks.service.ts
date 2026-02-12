import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UserTask } from './user-task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(UserTask)
    private readonly userTaskRepo: Repository<UserTask>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async listTasks() {
    return this.taskRepo.find({ order: { id: 'ASC' } });
  }

  async claimTask(userId: number, taskId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const lastClaim = await this.userTaskRepo.findOne({
      where: { user: { id: userId }, task: { id: taskId } },
      relations: ['user', 'task'],
      order: { claimedAt: 'DESC' },
    });

    if (lastClaim && task.cooldownSeconds > 0) {
      const elapsed = Math.floor((Date.now() - lastClaim.claimedAt.getTime()) / 1000);
      if (elapsed < task.cooldownSeconds) {
        throw new BadRequestException(`Cooldown active. Retry in ${task.cooldownSeconds - elapsed}s`);
      }
    }

    user.balance += task.reward;
    user.totalEarned += task.reward;
    await this.userRepo.save(user);

    await this.distributeReferral(user, task.reward);

    const userTask = this.userTaskRepo.create({ user, task });
    await this.userTaskRepo.save(userTask);

    return { user, task, claimedAt: userTask.claimedAt };
  }

  async distributeReferral(user: User, amount: number) {
    let current = user;
    const visited = new Set<number>();

    while (current.invitedBy) {
      if (visited.has(current.invitedBy)) {
        break;
      }
      visited.add(current.invitedBy);

      const parent = await this.userRepo.findOne({ where: { id: current.invitedBy } });
      if (!parent) {
        break;
      }

      const bonus = amount * 0.1;
      parent.balance += bonus;
      parent.totalEarned += bonus;

      await this.userRepo.save(parent);
      current = parent;
    }
  }
}