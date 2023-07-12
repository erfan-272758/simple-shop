import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocument } from 'models/user.model';
import { Observable } from 'rxjs';
import { RestrictToKey } from 'src/constant/String';
import { UserState } from 'types/user';

@Injectable()
export class RestrictToGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const states: UserState[] | undefined =
      this.reflector
        .getAllAndOverride(RestrictToKey, [
          context.getHandler(),
          context.getClass(),
        ])
        ?.flat() ?? [];

    const { user }: { user?: UserDocument } = context
      .switchToHttp()
      .getRequest();

    if (!user || !states.length) return true;

    const stateCondition = states.length ? states.includes(user.state) : true;

    return stateCondition;
  }
}
