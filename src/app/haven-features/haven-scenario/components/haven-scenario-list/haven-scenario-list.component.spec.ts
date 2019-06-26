import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavenScenarioListComponent } from './haven-scenario-list.component';

describe('HavenScenarioListComponent', () => {
  let component: HavenScenarioListComponent;
  let fixture: ComponentFixture<HavenScenarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavenScenarioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavenScenarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
