import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRegisterDetailComponent } from './standard-register-detail.component';

describe('StandardRegisterDetailComponent', () => {
  let component: StandardRegisterDetailComponent;
  let fixture: ComponentFixture<StandardRegisterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRegisterDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRegisterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
