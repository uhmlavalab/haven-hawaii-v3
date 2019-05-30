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
    if (!this.havenWindow.maximized) {
      this.havenWindow.savePosition.left = this.havenWindow.position.left;
      this.havenWindow.savePosition.top = this.havenWindow.position.top;
      this.havenWindow.saveSize.width = this.havenWindow.size.width;
      this.havenWindow.saveSize.height = this.havenWindow.size.height;

      this.havenWindow.position.left = 48;
      this.havenWindow.position.top = 0;

      this.windowDiv.style.left = this.havenWindow.position.left + 'px';
      this.windowDiv.style.top = this.havenWindow.position.top + 'px';

      const widthAdj = 48;

      this.windowDiv.style.width = window.innerWidth - widthAdj + 'px';
      this.windowDiv.style.height = window.innerHeight - (2 * 30) + 'px';

      this.havenWindow.maximized = true;
      this.appRef.resize();

    } else {
      this.windowDiv.style.left = this.havenWindow.savePosition.left + 'px';
      this.windowDiv.style.top = this.havenWindow.savePosition.top + 'px';
      this.windowDiv.style.width = this.havenWindow.saveSize.width + 'px';
      this.windowDiv.style.height = this.havenWindow.saveSize.height + 'px';

      this.havenWindow.position.left = this.havenWindow.savePosition.left;
      this.havenWindow.position.top = this.havenWindow.savePosition.top;

      this.havenWindow.maximized = false;
      this.appRef.resize();

    }
    event.stopPropagation();
  }



}
