import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMenuDetailComponent } from './standard-menu-detail.component';

describe('StandardMenuDetailComponent', () => {
  let component: StandardMenuDetailComponent;
  let fixture: ComponentFixture<StandardMenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardMenuDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardMenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
