import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGroupDetailComponent } from './standard-group-detail.component';

describe('StandardGroupDetailComponent', () => {
  let component: StandardGroupDetailComponent;
  let fixture: ComponentFixture<StandardGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardGroupDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
