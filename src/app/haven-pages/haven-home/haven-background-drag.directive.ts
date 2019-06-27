import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { HavenWindowService } from '@app/haven-features/haven-window';

@Directive({
  selector: '[appHavenBackgroundDrag]'
})
export class HavenBackgroundDragDirective implements OnInit {

  @Input() background: any;
  @Input() zoomIn: any;
  @Input() zoomOut: any;

  private dragging: boolean;

  private dragStartLeft: number;
  private dragStartTop: number;

  private startLeft: number;
  private startTop: number;

  private zoom = 1;

  constructor(private el: ElementRef, private windowService : HavenWindowService) {
  }

  ngOnInit() {
    this.zoomIn._elementRef.nativeElement.addEventListener('click', () => {
      let delta = -0.1;
      (Math.sign(delta) < 0) ? delta = 0.1 : delta = -0.1;
      this.zoom += delta;
      (this.zoom <= 0) ? this.zoom = 0.1 : this.zoom = this.zoom;
      this.background.style.zoom = this.zoom;
      this.windowService.currentZoom = this.zoom;
    });

    this.zoomOut._elementRef.nativeElement.addEventListener('click', () => {
      let delta = 0.1;
      (Math.sign(delta) < 0) ? delta = 0.1 : delta = -0.1;
      this.zoom += delta;
      (this.zoom <= 0) ? this.zoom = 0.1 : this.zoom = this.zoom;
      this.background.style.zoom = this.zoom;
      this.windowService.currentZoom = this.zoom;
    });

  }

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


}
