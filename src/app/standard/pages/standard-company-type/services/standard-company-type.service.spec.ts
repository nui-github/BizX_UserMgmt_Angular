import { TestBed } from '@angular/core/testing';

import { StandardCompanyTypeService } from './standard-company-type.service';

describe('StandardCompanyTypeService', () => {
  let service: StandardCompanyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardCompanyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
