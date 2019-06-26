import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenuFactoryComponent } from './app-menu-factory.component';

describe('AppFactoryComponent', () => {
  let component: AppMenuFactoryComponent;
  let fixture: ComponentFixture<AppMenuFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMenuFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
