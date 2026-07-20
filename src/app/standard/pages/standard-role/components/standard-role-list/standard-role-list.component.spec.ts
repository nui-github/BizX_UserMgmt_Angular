import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRoleListComponent } from './standard-role-list.component';

describe('StandardRoleListComponent', () => {
  let component: StandardRoleListComponent;
  let fixture: ComponentFixture<StandardRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRoleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
