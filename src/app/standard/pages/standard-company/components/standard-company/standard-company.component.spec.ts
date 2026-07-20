import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCompanyComponent } from './standard-company.component';

describe('StandardCompanyComponent', () => {
  let component: StandardCompanyComponent;
  let fixture: ComponentFixture<StandardCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
