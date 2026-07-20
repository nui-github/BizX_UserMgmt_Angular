import { CanActivateChildFn } from '@angular/router';

export const standardAuthCanActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
