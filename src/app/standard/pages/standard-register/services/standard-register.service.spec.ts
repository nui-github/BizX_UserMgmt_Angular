import { TestBed } from '@angular/core/testing';

import { StandardRegisterService } from './standard-register.service';

describe('StandardRegisterService', () => {
  let service: StandardRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
