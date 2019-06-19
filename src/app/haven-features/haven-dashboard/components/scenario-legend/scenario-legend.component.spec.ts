import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioLegendComponent } from './scenario-legend.component';

describe('ScenarioLegendComponent', () => {
  let component: ScenarioLegendComponent;
  let fixture: ComponentFixture<ScenarioLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
