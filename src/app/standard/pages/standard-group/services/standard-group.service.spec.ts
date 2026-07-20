import { TestBed } from '@angular/core/testing';

import { StandardGroupService } from './standard-group.service';

describe('StandardGroupService', () => {
  let service: StandardGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
