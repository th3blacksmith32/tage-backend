import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  validateTelegramData(initData: string): boolean {
    const botToken = process.env.TG_BOT_TOKEN!;
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = [...urlParams.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = crypto.createHash('sha256').update(botToken).digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  }

  estimateDays(id: number) {
    const telegramEpoch = 1388534400;
    const approx = telegramEpoch + id / 1000000000;
    const days = Math.floor((Date.now() / 1000 - approx) / 86400);
    return Math.max(0, days);
  }

  async loginOrCreate(telegramUser: { id: number; username?: string }, ref?: number) {
    const telegramId = String(telegramUser.id);

    let user = await this.userRepo.findOne({ where: { telegramId } });

    if (!user) {
      user = this.userRepo.create({
        telegramId,
        username: telegramUser.username || null,
        invitedBy: ref || null,
      });
      await this.userRepo.save(user);
    } else if (!user.invitedBy && ref && ref !== user.id) {
      user.invitedBy = ref;
      await this.userRepo.save(user);
    }

    if (!user.ageRewardClaimed) {
      const days = this.estimateDays(Number(user.telegramId));
      const reward = days * 20;

      user.balance += reward;
      user.totalEarned += reward;
      user.ageRewardClaimed = true;
      await this.userRepo.save(user);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Missing JWT_SECRET');
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '30d' });

    return { token, user };
  }
}
