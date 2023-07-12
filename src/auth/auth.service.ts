import { Injectable } from '@nestjs/common';
import { UserLoginBody, UserSignupBody } from 'DTO/auth/incoming.dto';

@Injectable()
export class AuthService {
  async signup(body: UserSignupBody) {}
  async login(body: UserLoginBody) {}
  async verifyEmail(token: string) {}
}
