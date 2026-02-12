import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invite } from './invite.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(Invite)
    private repo: Repository<Invite>,
    private users: UsersService
  ) {}

  async link(inviterId: string, invitedId: string) {
    await this.repo.save({ inviterId, invitedUserId: invitedId });
    await this.users.setInviter(invitedId, inviterId);
  }

  async reward(invitedId: string, amount: number) {
    const invite = await this.repo.findOne({
      where: { invitedUserId: invitedId }
    });
    if (!invite) return;

    const bonus = amount * 0.1;
    await this.users.addBalance(invite.inviterId, bonus);
  }
}
