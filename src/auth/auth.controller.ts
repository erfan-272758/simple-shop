import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import {
  UserEmailVerifyQuery,
  UserLoginBody,
  UserSignupBody,
} from 'DTO/auth/incoming.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('/signup')
  signup(@Body() body: UserSignupBody, @Req() req: Request) {
    return this.service.signup(body, req);
  }

  @Get('/verifyEmail/:id')
  verifyEmail(
    @Param('id') id: string,
    @Query() { token }: UserEmailVerifyQuery,
  ) {
    return this.service.verifyEmail(id, token);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() body: UserLoginBody) {
    return this.service.login(body);
  }
}
