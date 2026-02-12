import { Repository } from 'typeorm';
import { UserTask } from './user-task.entity';
import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';
export declare class TasksService {
    private repo;
    private users;
    private invites;
    constructor(repo: Repository<UserTask>, users: UsersService, invites: InvitesService);
    start(userId: string, taskId: string): Promise<{
        userId: string;
        taskId: string;
        startedAt: Date;
    } & UserTask>;
    claim(userId: string, taskId: string, reward: number): Promise<UserTask>;
}
