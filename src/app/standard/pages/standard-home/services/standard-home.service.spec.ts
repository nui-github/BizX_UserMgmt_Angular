import { TestBed } from '@angular/core/testing';

import { StandardHomeService } from './standard-home.service';

describe('StandardHomeService', () => {
  let service: StandardHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
