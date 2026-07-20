import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSidebarComponent } from './standard-sidebar.component';

describe('StandardSidebarComponent', () => {
  let component: StandardSidebarComponent;
  let fixture: ComponentFixture<StandardSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
