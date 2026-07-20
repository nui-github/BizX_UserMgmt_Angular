import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardHomeComponent } from './standard-home.component';

describe('StandardHomeComponent', () => {
  let component: StandardHomeComponent;
  let fixture: ComponentFixture<StandardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
