import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardChangePasswordComponent } from './standard-change-password.component';

describe('StandardChangePasswordComponent', () => {
  let component: StandardChangePasswordComponent;
  let fixture: ComponentFixture<StandardChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardChangePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
