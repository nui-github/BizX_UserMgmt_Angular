import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRegisterManagementDetailComponent } from './standard-register-management-detail.component';

describe('StandardRegisterManagementDetailComponent', () => {
  let component: StandardRegisterManagementDetailComponent;
  let fixture: ComponentFixture<StandardRegisterManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRegisterManagementDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRegisterManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
