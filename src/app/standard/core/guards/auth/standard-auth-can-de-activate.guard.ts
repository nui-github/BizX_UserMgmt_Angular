import { CanDeactivateFn } from '@angular/router';

export const standardAuthCanDeActivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
