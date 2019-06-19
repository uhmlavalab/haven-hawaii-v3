import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBladeItemComponent } from './menu-blade-item.component';

describe('MenuBladeItemComponent', () => {
  let component: MenuBladeItemComponent;
  let fixture: ComponentFixture<MenuBladeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBladeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBladeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
