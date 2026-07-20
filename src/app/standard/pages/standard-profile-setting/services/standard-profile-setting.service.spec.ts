import { TestBed } from '@angular/core/testing';

import { StandardProfileSettingService } from './standard-profile-setting.service';

describe('StandardProfileSettingService', () => {
  let service: StandardProfileSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardProfileSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
