import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardUserDetailComponent } from './standard-user-detail.component';

describe('StandardUserDetailComponent', () => {
  let component: StandardUserDetailComponent;
  let fixture: ComponentFixture<StandardUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardUserDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
