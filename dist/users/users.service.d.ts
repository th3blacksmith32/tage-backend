import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    findOrCreate(telegramId: string): Promise<User>;
    setInviter(userId: string, inviterId: string): Promise<void>;
    addBalance(userId: string, amount: number): Promise<void>;
}
