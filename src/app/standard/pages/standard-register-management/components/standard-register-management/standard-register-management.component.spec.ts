import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRegisterManagementComponent } from './standard-register-management.component';

describe('StandardRegisterManagementComponent', () => {
  let component: StandardRegisterManagementComponent;
  let fixture: ComponentFixture<StandardRegisterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRegisterManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRegisterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
