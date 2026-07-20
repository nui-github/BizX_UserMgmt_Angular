import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardShowingPageComponent } from './standard-showing-page.component';

describe('StandardShowingPageComponent', () => {
  let component: StandardShowingPageComponent;
  let fixture: ComponentFixture<StandardShowingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardShowingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardShowingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
