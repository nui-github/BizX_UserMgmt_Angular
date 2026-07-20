import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardNotFoundComponent } from './standard-not-found.component';

describe('StandardNotFoundComponent', () => {
  let component: StandardNotFoundComponent;
  let fixture: ComponentFixture<StandardNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
