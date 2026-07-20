import { CanMatchFn } from '@angular/router';

export const standardAuthCanMatchGuard: CanMatchFn = (route, segments) => {
  return true;
};
