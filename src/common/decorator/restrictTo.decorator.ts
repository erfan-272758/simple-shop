import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RestrictToKey } from 'src/constant/String';
import { UserState } from 'types/user';
import { RestrictToGuard } from '../guard/restrict-to.guard';

export function RestrictTo(state: UserState | UserState[]) {
  return applyDecorators(
    SetMetadata(RestrictToKey, Array.isArray(state) ? state : [state]),
    UseGuards(RestrictToGuard),
  );
}
