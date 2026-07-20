import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMenuListComponent } from './standard-menu-list.component';

describe('StandardMenuListComponent', () => {
  let component: StandardMenuListComponent;
  let fixture: ComponentFixture<StandardMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardMenuListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
