import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface MenuBladeItem {
  icon: string;
  text: string;
  left?: string;
  bottom?: string;
  click(): any | null;
}

@Component({
  selector: 'app-menu-blade-item',
  templateUrl: './menu-blade-item.component.html',
  styleUrls: ['./menu-blade-item.component.css'],
  animations: [
    trigger('buttonState', [
      state('notactive', style({ left: '-50px', bottom: '-50px'}),  {params : { left: 0, bottom: 0 }}),
      state('active', style({ left:  '{{left}}', bottom: '{{bottom}}'}),  {params : { left: 0, bottom: 0 }}),
      transition('notactive <=> active', animate('750ms')),
    ])
  ],
})
export class MenuBladeItemComponent implements OnInit {

  @Input() menuState: string;
  @Input() button: MenuBladeItem;

  ngOnInit() {}

}
