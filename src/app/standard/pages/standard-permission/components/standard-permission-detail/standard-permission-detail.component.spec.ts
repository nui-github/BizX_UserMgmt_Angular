import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardPermissionDetailComponent } from './standard-permission-detail.component';

describe('StandardPermissionDetailComponent', () => {
  let component: StandardPermissionDetailComponent;
  let fixture: ComponentFixture<StandardPermissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardPermissionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardPermissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
