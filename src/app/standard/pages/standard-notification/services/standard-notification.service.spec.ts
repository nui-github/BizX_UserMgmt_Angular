import { TestBed } from '@angular/core/testing';

import { StandardNotificationService } from './standard-notification.service';

describe('StandardNotificationService', () => {
  let service: StandardNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
