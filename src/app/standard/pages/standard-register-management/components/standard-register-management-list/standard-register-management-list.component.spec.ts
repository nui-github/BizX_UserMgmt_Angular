import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRegisterManagementListComponent } from './standard-register-management-list.component';

describe('StandardRegisterManagementListComponent', () => {
  let component: StandardRegisterManagementListComponent;
  let fixture: ComponentFixture<StandardRegisterManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRegisterManagementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRegisterManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
