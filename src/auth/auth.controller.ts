import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserLoginBody, UserSignupBody } from 'DTO/auth/incoming.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/signup')
  signup(@Body() body: UserSignupBody) {
    return this.service.signup(body);
  }

  @Get('/verifyEmail/:token')
  verifyEmail(@Param('token') token: string) {
    return this.service.verifyEmail(token);
  }

  @Post('/login')
  login(@Body() body: UserLoginBody) {
    return this.service.login(body);
  }
}
