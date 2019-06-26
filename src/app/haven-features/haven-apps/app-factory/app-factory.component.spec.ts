import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFactoryComponent } from './app-factory.component';

describe('AppFactoryComponent', () => {
  let component: AppFactoryComponent;
  let fixture: ComponentFixture<AppFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
