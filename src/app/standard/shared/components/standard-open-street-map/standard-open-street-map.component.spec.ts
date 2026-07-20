import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardOpenStreetMapComponent } from './standard-open-street-map.component';

describe('StandardOpenStreetMapComponent', () => {
  let component: StandardOpenStreetMapComponent;
  let fixture: ComponentFixture<StandardOpenStreetMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardOpenStreetMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardOpenStreetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
