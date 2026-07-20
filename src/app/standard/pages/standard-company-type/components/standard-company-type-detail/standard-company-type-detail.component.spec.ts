import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCompanyTypeDetailComponent } from './standard-company-type-detail.component';

describe('StandardCompanyTypeDetailComponent', () => {
  let component: StandardCompanyTypeDetailComponent;
  let fixture: ComponentFixture<StandardCompanyTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardCompanyTypeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardCompanyTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
