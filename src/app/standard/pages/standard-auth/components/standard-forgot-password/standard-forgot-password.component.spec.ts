import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardForgotPasswordComponent } from './standard-forgot-password.component';

describe('StandardForgotPasswordComponent', () => {
  let component: StandardForgotPasswordComponent;
  let fixture: ComponentFixture<StandardForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardForgotPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
