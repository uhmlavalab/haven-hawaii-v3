import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrelDataViewerComponent } from './nrel-data-viewer.component';

describe('NrelDataViewerComponent', () => {
  let component: NrelDataViewerComponent;
  let fixture: ComponentFixture<NrelDataViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrelDataViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrelDataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
