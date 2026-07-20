import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMainmenuComponent } from './standard-mainmenu.component';

describe('StandardMainmenuComponent', () => {
  let component: StandardMainmenuComponent;
  let fixture: ComponentFixture<StandardMainmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardMainmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardMainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
