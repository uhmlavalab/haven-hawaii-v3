import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavenConfigureMapComponent } from './haven-configure-map.component';

describe('HavenConfigureMapComponent', () => {
  let component: HavenConfigureMapComponent;
  let fixture: ComponentFixture<HavenConfigureMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavenConfigureMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavenConfigureMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
