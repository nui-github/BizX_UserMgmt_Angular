import { TestBed } from '@angular/core/testing';

import { StandardPermissionService } from './standard-permission.service';

describe('StandardPermissionService', () => {
  let service: StandardPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
