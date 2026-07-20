import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCompanyTypeListComponent } from './standard-company-type-list.component';

describe('StandardCompanyTypeListComponent', () => {
  let component: StandardCompanyTypeListComponent;
  let fixture: ComponentFixture<StandardCompanyTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardCompanyTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardCompanyTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
