import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardErrorMessageComponent } from './standard-error-message.component';

describe('StandardErrorMessageComponent', () => {
  let component: StandardErrorMessageComponent;
  let fixture: ComponentFixture<StandardErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardErrorMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
