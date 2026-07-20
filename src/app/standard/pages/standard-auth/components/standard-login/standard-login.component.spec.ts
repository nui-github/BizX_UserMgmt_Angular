import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardLoginComponent } from './standard-login.component';

describe('StandardLoginComponent', () => {
  let component: StandardLoginComponent;
  let fixture: ComponentFixture<StandardLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
