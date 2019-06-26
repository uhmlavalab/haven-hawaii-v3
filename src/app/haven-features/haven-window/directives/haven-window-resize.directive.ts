import { Directive, ElementRef, HostListener, Input, ViewChild, } from '@angular/core';

import { HavenWindow } from '../shared/haven-window';
import { AppFactoryComponent } from '@app/haven-features/haven-apps';

@Directive({
  selector: '[appHavenWindowResize]'
})
export class HavenWindowResizeDirective {

  @Input() windowDiv: any;
  @Input() havenWindow: HavenWindow;
  @Input() titleDiv: any;
  @Input() menuDiv: any;
  @Input() appDiv: any;

  private resizeSelected: boolean;

  private resizeStartLeft: number;
  private resizeStartTop: number;

  private startWindowWidth: number;
  private startWindowHeight: number;

  constructor(private el: ElementRef) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    this.resizeStartLeft = event.clientX;
    this.resizeStartTop = event.clientY;
    this.startWindowWidth = this.havenWindow.width;
    this.startWindowHeight = this.havenWindow.height;
    this.resizeSelected = true;
    event.stopPropagation();
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp() {
    this.resizeSelected = false;
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event) {
    if (this.resizeSelected === true) {
      this.havenWindow.width = Math.max(400, this.startWindowWidth + (event.clientX - this.resizeStartLeft));
      this.havenWindow.height = Math.max(400, this.startWindowHeight + (event.clientY - this.resizeStartTop));
      this.windowDiv.style.width = this.havenWindow.width + 'px';
      this.windowDiv.style.height = this.havenWindow.height + 'px';
      this.titleDiv.style.width = this.windowDiv.style.width;
      this.menuDiv.style.width = this.havenWindow.width - 25 + 'px';
      this.appDiv.resize();
      event.stopPropagation();
    }
  }

}
