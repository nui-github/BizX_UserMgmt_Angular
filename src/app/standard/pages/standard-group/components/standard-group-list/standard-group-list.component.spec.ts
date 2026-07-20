import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGroupListComponent } from './standard-group-list.component';

describe('StandardGroupListComponent', () => {
  let component: StandardGroupListComponent;
  let fixture: ComponentFixture<StandardGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardGroupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
