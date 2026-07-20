import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { standardAuthCanActivateChildGuard } from './standard-auth-can-activate-child.guard';

describe('standardAuthCanActivateChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => standardAuthCanActivateChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
