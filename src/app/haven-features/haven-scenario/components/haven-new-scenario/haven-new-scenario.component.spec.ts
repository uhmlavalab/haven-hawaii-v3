import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavenNewScenarioComponent } from './haven-new-scenario.component';

describe('HavenNewScenarioComponent', () => {
  let component: HavenNewScenarioComponent;
  let fixture: ComponentFixture<HavenNewScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavenNewScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavenNewScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
