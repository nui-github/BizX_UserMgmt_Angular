import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { standardAuthCanMatchGuard } from './standard-auth-can-match.guard';

describe('standardAuthCanMatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => standardAuthCanMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
