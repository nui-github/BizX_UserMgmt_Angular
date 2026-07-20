import { TestBed } from '@angular/core/testing';

import { StandardSubdistrictService } from './standard-subdistrict.service';

describe('StandardSubdistrictService', () => {
  let service: StandardSubdistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardSubdistrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
