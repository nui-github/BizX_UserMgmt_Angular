import { TestBed } from '@angular/core/testing';

import { StandardUserService } from './standard-user.service';

describe('StandardUserService', () => {
  let service: StandardUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
