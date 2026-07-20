import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardNotificationComponent } from './standard-notification.component';

describe('StandardNotificationComponent', () => {
  let component: StandardNotificationComponent;
  let fixture: ComponentFixture<StandardNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
