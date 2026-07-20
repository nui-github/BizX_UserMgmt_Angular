import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { standardAuthCanActivateGuard } from './standard-auth-can-activate.guard';

describe('standardAuthCanActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => standardAuthCanActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
