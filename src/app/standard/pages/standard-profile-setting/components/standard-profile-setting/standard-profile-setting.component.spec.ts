import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardProfileSettingComponent } from './standard-profile-setting.component';

describe('StandardProfileSettingComponent', () => {
  let component: StandardProfileSettingComponent;
  let fixture: ComponentFixture<StandardProfileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardProfileSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
