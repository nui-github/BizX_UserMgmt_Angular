import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCompanyTypeComponent } from './standard-company-type.component';

describe('StandardCompanyTypeComponent', () => {
  let component: StandardCompanyTypeComponent;
  let fixture: ComponentFixture<StandardCompanyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardCompanyTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardCompanyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
