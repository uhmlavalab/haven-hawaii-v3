import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appHavenBackgroundDrag]'
})
export class HavenBackgroundDragDirective {

  @Input() background: any;

  private dragging: boolean;

  private dragStartLeft: number;
  private dragStartTop: number;

  private startLeft: number;
  private startTop: number;

  constructor(private el: ElementRef) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    this.dragStartLeft = event.clientX;
    this.dragStartTop =  event.clientY;
    this.startLeft = this.background.getBoundingClientRect().left;
    this.startTop = this.background.getBoundingClientRect().top;
    this.dragging = true;
    this.background.style.cursor = 'grabbing';
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp() {
    this.dragging = false;
    this.background.style.cursor = 'grab';
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event) {
    if (this.dragging === true) {
      const left = this.startLeft + (event.clientX - this.dragStartLeft);
      const top = this.startTop + (event.clientY - this.dragStartTop);
      this.background.style.left = left + 'px';
      this.background.style.top = top + 'px';
    }
  }

}
