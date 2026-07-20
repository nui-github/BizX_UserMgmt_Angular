import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMenuComponent } from './standard-menu.component';

describe('StandardMenuComponent', () => {
  let component: StandardMenuComponent;
  let fixture: ComponentFixture<StandardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
