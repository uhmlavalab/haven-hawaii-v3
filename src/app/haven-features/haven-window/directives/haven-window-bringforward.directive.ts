import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HavenWindowService } from '../services/haven-window.service';
import { HavenWindow } from '../shared/haven-window';

@Directive({
  selector: '[appHavenWindowBringforward]'
})
export class HavenWindowBringforwardDirective {

  @Input() havenWindow: HavenWindow;

  constructor(private el: ElementRef, private windowService: HavenWindowService) { }

  @HostListener('mousedown') onMouseDown() {
    this.windowService.bringWindowForward(this.havenWindow.id);
  }
}
