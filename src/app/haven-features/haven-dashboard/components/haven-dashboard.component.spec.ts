import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavenDashboardComponent } from './haven-dashboard.component';

describe('HavenDashboardComponent', () => {
  let component: HavenDashboardComponent;
  let fixture: ComponentFixture<HavenDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavenDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
