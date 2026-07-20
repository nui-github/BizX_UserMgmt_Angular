import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardAuthComponent } from './standard-auth.component';

describe('StandardAuthComponent', () => {
  let component: StandardAuthComponent;
  let fixture: ComponentFixture<StandardAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
