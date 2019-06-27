import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HavenWindow } from '../shared/haven-window';
import { HavenWindowService } from '../services/haven-window.service';

@Directive({
  selector: '[appHavenWindowDrag]'
})
export class HavenWindowDragDirective {

  @Input() windowDiv: any;
  @Input() havenWindow: HavenWindow;

  private dragbarSelected: boolean;

  private dragStartLeft: number;
  private dragStartTop: number;

  private startWindowLeft: number;
  private startWindowTop: number;

  constructor(private el: ElementRef, private windowService: HavenWindowService) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    this.dragStartLeft = event.clientX;
    this.dragStartTop =  event.clientY;
    this.startWindowLeft = this.havenWindow.left;
    this.startWindowTop = this.havenWindow.top;
    this.dragbarSelected = true;
    this.windowService.bringWindowForward(this.havenWindow.id);
    event.stopPropagation();
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp() {
    this.dragbarSelected = false;

  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event) {
    if (this.dragbarSelected === true) {
      this.havenWindow.left = Math.max(0, this.startWindowLeft + (event.clientX - this.dragStartLeft) * (1 / this.windowService.currentZoom));
      this.havenWindow.top = Math.max(0, this.startWindowTop + (event.clientY - this.dragStartTop) * (1 / this.windowService.currentZoom));
      this.windowDiv.style.left = this.havenWindow.left + 'px';
      this.windowDiv.style.top = this.havenWindow.top + 'px';
      event.stopPropagation();
    }
  }

}
