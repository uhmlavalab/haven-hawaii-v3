import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavenConfigureScenarioComponent } from './haven-configure-scenario.component';

describe('HavenConfigureScenarioComponent', () => {
  let component: HavenConfigureScenarioComponent;
  let fixture: ComponentFixture<HavenConfigureScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavenConfigureScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavenConfigureScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
