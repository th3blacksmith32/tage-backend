import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    telegram(body: {
        initData: string;
        startParam?: string;
    }): Promise<{
        token: string;
    }>;
}
