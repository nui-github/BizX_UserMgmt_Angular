import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const standardAuthCanActivateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem("currentUser")) {
    return true;
  }
  router.navigateByUrl("/auth");
  return false;
};
