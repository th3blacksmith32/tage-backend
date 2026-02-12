import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class JwtGuard implements CanActivate {
    canActivate(_context: ExecutionContext): boolean;
}
