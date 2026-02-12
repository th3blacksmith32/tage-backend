import { Repository } from 'typeorm';
import { Invite } from './invite.entity';
import { UsersService } from '../users/users.service';
export declare class InvitesService {
    private repo;
    private users;
    constructor(repo: Repository<Invite>, users: UsersService);
    link(inviterId: string, invitedId: string): Promise<void>;
    reward(invitedId: string, amount: number): Promise<void>;
}
