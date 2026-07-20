import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSubdistrictComponent } from './standard-subdistrict.component';

describe('StandardSubdistrictComponent', () => {
  let component: StandardSubdistrictComponent;
  let fixture: ComponentFixture<StandardSubdistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardSubdistrictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardSubdistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
