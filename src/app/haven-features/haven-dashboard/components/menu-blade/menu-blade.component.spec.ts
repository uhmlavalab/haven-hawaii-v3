import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBladeComponent } from './menu-blade.component';

describe('MenuBladeComponent', () => {
  let component: MenuBladeComponent;
  let fixture: ComponentFixture<MenuBladeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBladeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
