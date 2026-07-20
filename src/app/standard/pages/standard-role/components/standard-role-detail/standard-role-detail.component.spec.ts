import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRoleDetailComponent } from './standard-role-detail.component';

describe('StandardRoleDetailComponent', () => {
  let component: StandardRoleDetailComponent;
  let fixture: ComponentFixture<StandardRoleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRoleDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
