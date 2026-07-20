import { TestBed } from '@angular/core/testing';

import { StandardCompanyService } from './standard-company.service';

describe('StandardCompanyService', () => {
  let service: StandardCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
