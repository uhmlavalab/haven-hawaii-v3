import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrelDataDialogComponent } from './nrel-data-dialog.component';

describe('NrelDataDialogComponent', () => {
  let component: NrelDataDialogComponent;
  let fixture: ComponentFixture<NrelDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrelDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrelDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
