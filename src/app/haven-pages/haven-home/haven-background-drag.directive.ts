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

  private zoom = 1;

  constructor(private el: ElementRef) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    this.dragStartLeft = event.clientX;
    this.dragStartTop = event.clientY;
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
      const left = this.startLeft + (event.clientX - this.dragStartLeft) * (1 / this.zoom);
      const top = this.startTop + (event.clientY - this.dragStartTop) * (1 / this.zoom);
      this.background.style.left = left + 'px';
      this.background.style.top = top + 'px';
    }
  }

  @HostListener('wheel', ['$event']) onMouseWheel(event) {
    let delta = 0;
    (Math.sign(event.deltaY) < 0) ? delta = 0.1 : delta = -0.1;
    this.zoom += delta;
    (this.zoom <= 0) ? this.zoom = 0.1 : this.zoom = this.zoom;
    this.background.style.zoom = this.zoom;
  }

}
