import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRoleComponent } from './standard-role.component';

describe('StandardRoleComponent', () => {
  let component: StandardRoleComponent;
  let fixture: ComponentFixture<StandardRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
