import { TestBed } from '@angular/core/testing';

import { StandardRoleService } from './standard-role.service';

describe('StandardRoleService', () => {
  let service: StandardRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
