import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardUserListComponent } from './standard-user-list.component';

describe('StandardUserListComponent', () => {
  let component: StandardUserListComponent;
  let fixture: ComponentFixture<StandardUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
