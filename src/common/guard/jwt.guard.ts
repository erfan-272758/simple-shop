import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(ctx: ExecutionContext) {
    const canActive = super.canActivate(ctx);
    let result: boolean, error: any;

    try {
      if (canActive instanceof Observable) {
        result = await lastValueFrom(canActive);
      } else {
        result = await canActive;
      }
    } catch (err) {
      result = false;
      error = err;
    }

    if (error) throw error;
    return result;
  }
}
