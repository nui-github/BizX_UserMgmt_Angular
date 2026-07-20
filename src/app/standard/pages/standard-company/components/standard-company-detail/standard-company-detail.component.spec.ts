import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCompanyDetailComponent } from './standard-company-detail.component';

describe('StandardCompanyDetailComponent', () => {
  let component: StandardCompanyDetailComponent;
  let fixture: ComponentFixture<StandardCompanyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardCompanyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
