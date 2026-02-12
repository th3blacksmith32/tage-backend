import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private invites: InvitesService,
    private jwt: JwtService
  ) {}

  verifyTelegram(initData: string) {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    params.delete('hash');

    const data = [...params.entries()]
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secret = crypto
      .createHash('sha256')
      .update(process.env.TG_BOT_TOKEN!)
      .digest();

    const check = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('hex');

    if (check !== hash) throw new Error('Invalid Telegram');

    return Object.fromEntries(params);
  }

  async login(initData: string, startParam?: string) {
    const tg = this.verifyTelegram(initData);
    const user = await this.users.findOrCreate(tg.id);

    if (startParam?.startsWith('ref_') && !user.inviterId) {
      const inviterId = startParam.replace('ref_', '');
      await this.invites.link(inviterId, user.id);
    }

    return {
      token: this.jwt.sign({ sub: user.id })
    };
  }
}
