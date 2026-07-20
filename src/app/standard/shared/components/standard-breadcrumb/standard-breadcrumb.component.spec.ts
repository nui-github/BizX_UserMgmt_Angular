import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardBreadcrumbComponent } from './standard-breadcrumb.component';

describe('StandardBreadcrumbComponent', () => {
  let component: StandardBreadcrumbComponent;
  let fixture: ComponentFixture<StandardBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardBreadcrumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
