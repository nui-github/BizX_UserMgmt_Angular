import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCompanyListComponent } from './standard-company-list.component';

describe('StandardCompanyListComponent', () => {
  let component: StandardCompanyListComponent;
  let fixture: ComponentFixture<StandardCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardCompanyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
