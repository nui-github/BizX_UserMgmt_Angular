import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardFormCardComponent } from './standard-form-card.component';

describe('StandardFormCardComponent', () => {
  let component: StandardFormCardComponent;
  let fixture: ComponentFixture<StandardFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardFormCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
