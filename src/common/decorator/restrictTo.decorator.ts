import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RestrictToKey } from 'src/constant/String';
import { UserState } from 'types/user';
import { RestrictToGuard } from '../guard/restrict-to.guard';

export function RestrictTo(state: UserState) {
  return applyDecorators(
    SetMetadata(RestrictToKey, state),
    UseGuards(RestrictToGuard),
  );
}
