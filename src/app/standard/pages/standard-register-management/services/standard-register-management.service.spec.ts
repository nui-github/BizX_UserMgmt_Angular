import { TestBed } from '@angular/core/testing';

import { StandardRegisterManagementService } from './standard-register-management.service';

describe('StandardRegisterManagementService', () => {
  let service: StandardRegisterManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardRegisterManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
