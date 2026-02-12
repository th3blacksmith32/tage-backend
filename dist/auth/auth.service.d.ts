import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InvitesService } from '../invites/invites.service';
export declare class AuthService {
    private users;
    private invites;
    private jwt;
    constructor(users: UsersService, invites: InvitesService, jwt: JwtService);
    verifyTelegram(initData: string): {
        [k: string]: string;
    };
    login(initData: string, startParam?: string): Promise<{
        token: string;
    }>;
}
