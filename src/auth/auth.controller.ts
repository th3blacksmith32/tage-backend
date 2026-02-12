import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('telegram')
  async telegram(@Body() body: { initData: string; startParam?: string }) {
    return this.auth.login(body.initData, body.startParam);
  }
}
