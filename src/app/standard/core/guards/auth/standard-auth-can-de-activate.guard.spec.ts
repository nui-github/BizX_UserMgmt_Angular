import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { standardAuthCanDeActivateGuard } from './standard-auth-can-de-activate.guard';

describe('standardAuthCanDeActivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => standardAuthCanDeActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
