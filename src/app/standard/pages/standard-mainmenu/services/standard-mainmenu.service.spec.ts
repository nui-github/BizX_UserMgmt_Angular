import { TestBed } from '@angular/core/testing';

import { StandardMainmenuService } from './standard-mainmenu.service';

describe('StandardMainmenuService', () => {
  let service: StandardMainmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardMainmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
