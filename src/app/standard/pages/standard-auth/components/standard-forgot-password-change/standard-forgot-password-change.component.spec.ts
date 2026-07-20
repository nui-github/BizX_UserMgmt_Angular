import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardForgotPasswordChangeComponent } from './standard-forgot-password-change.component';

describe('StandardForgotPasswordChangeComponent', () => {
  let component: StandardForgotPasswordChangeComponent;
  let fixture: ComponentFixture<StandardForgotPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardForgotPasswordChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardForgotPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
