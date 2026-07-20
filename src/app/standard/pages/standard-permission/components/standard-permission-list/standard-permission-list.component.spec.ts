import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardPermissionListComponent } from './standard-permission-list.component';

describe('StandardPermissionListComponent', () => {
  let component: StandardPermissionListComponent;
  let fixture: ComponentFixture<StandardPermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardPermissionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
