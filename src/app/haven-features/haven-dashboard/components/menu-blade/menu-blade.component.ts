import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenuBladeItem } from '../menu-blade-item/menu-blade-item.component';

@Component({
  selector: 'app-menu-blade',
  templateUrl: './menu-blade.component.html',
  styleUrls: ['./menu-blade.component.css'],
  animations: [
    trigger('bladeState', [
      state('notactive', style({ width: '0px', height: '0px', borderTop: '100px solid darkgray', borderRight: '100px solid darkgray' })),
      state('active', style({ width: '175px', height: '175px', borderTop: '100px solid #285f8d', borderRight: '100px solid #285f8d' })),
      transition('notactive <=> active', animate('750ms'))
    ]),
  ],
})
export class MenuBladeComponent implements OnInit {

  @Input() menuItems: MenuBladeItem[];
  @Input() menuState: string;

  constructor(private detectorref: ChangeDetectorRef) { }

  ngOnInit() {
    this.configureMenuItemsPositions();
  }

  configureMenuItemsPositions() {
    const radius = 200;
    const step = (Math.PI / 2) / (this.menuItems.length);
    let angle = step / 2;
    this.menuItems.forEach((el) => {
      const x = Math.round(radius * Math.cos(angle));
      const y = Math.round(radius * Math.sin(angle));
      el.left = x + 'px';
      el.bottom = y + 'px';
      angle += step;
    });
    this.detectorref.detectChanges();
  }

}
