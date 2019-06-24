import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { HavenWindow } from '../shared/haven-window';

@Directive({
  selector: '[appHavenWindowMaximize]'
})
export class HavenWindowMaximizeDirective {

  @Input() windowDiv: any;
  @Input() havenWindow: HavenWindow;
  @Input() appRef: any;

  constructor() { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {


  }



}
