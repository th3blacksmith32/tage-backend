import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  async findOrCreate(telegramId: string) {
    let user = await this.repo.findOne({ where: { telegramId } });
    if (!user) {
      user = await this.repo.save({ telegramId, balance: 0 });
    }
    return user;
  }

  async setInviter(userId: string, inviterId: string) {
    await this.repo.update({ id: userId }, { inviterId });
  }

  async addBalance(userId: string, amount: number) {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) {
      return;
    }
    user.balance = Number(user.balance || 0) + Number(amount || 0);
    await this.repo.save(user);
  }
}
