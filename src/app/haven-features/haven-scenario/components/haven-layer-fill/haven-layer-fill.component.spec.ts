import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavenLayerFillComponent } from './haven-layer-fill.component';

describe('HavenLayerFillComponent', () => {
  let component: HavenLayerFillComponent;
  let fixture: ComponentFixture<HavenLayerFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavenLayerFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavenLayerFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
