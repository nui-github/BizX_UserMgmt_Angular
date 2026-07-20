import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTrackingComponent } from './standard-tracking.component';

describe('StandardTrackingComponent', () => {
  let component: StandardTrackingComponent;
  let fixture: ComponentFixture<StandardTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
