import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardPermissionComponent } from './standard-permission.component';

describe('StandardPermissionComponent', () => {
  let component: StandardPermissionComponent;
  let fixture: ComponentFixture<StandardPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
