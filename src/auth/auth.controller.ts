import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async telegram(@Body() body: { initData: string; ref?: number }) {
    const { initData, ref } = body || {};

    if (!initData) {
      throw new UnauthorizedException('Missing initData');
    }

    const valid = this.authService.verifyTelegram(initData);
    if (!valid) {
      throw new UnauthorizedException('Invalid Telegram signature');
    }

    const parsed = new URLSearchParams(initData);
    const rawUser = parsed.get('user');
    if (!rawUser) {
      throw new UnauthorizedException('Missing Telegram user payload');
    }

    const telegramUser = JSON.parse(rawUser);
    return this.authService.loginOrCreate(telegramUser, ref);
  }
}