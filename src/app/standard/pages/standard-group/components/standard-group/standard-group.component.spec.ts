import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGroupComponent } from './standard-group.component';

describe('StandardGroupComponent', () => {
  let component: StandardGroupComponent;
  let fixture: ComponentFixture<StandardGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
