import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardNotificationListComponent } from './standard-notification-list.component';

describe('StandardNotificationListComponent', () => {
  let component: StandardNotificationListComponent;
  let fixture: ComponentFixture<StandardNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardNotificationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
