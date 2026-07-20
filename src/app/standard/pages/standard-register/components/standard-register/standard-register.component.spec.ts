import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRegisterComponent } from './standard-register.component';

describe('StandardRegisterComponent', () => {
  let component: StandardRegisterComponent;
  let fixture: ComponentFixture<StandardRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
