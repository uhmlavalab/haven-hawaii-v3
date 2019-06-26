import { Component, AfterContentInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { HavenWindowService } from '../services/haven-window.service';

import { HavenWindow } from '../shared/haven-window';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-haven-window',
  templateUrl: './haven-window.component.html',
  styleUrls: ['./haven-window.component.css'],
  providers: [],
  animations: [
    trigger('menuOpen', [
      state('notactive', style({ bottom: '-50px' })),
      state('active', style({ bottom: '-200px' })),
      transition('notactive <=> active', animate('750ms'))
    ]),
  ],

})
export class HavenWindowComponent extends HavenWindow implements AfterContentInit {

  menuState = 'notactive';

  @ViewChild('windowDiv', { static: true }) windowDiv: ElementRef;

  constructor(private havenWindowService: HavenWindowService) {
    super();
  }

  ngAfterContentInit() {
    this.setWindowInitialSettings();
    this.havenWindowService.WindowZUpdate.subscribe(windows => {
      this.windowDiv.nativeElement.style.zIndex = windows[this.id];
    });
  }

  setWindowInitialSettings() {
    this.windowDiv.nativeElement.style.width = this.width + 'px';
    this.windowDiv.nativeElement.style.height = this.height + 'px';
    this.windowDiv.nativeElement.style.left = this.left + 'px';
    this.windowDiv.nativeElement.style.top = this.top + 'px';
    this.windowDiv.nativeElement.style.zIndex = 100;
    this.havenWindowService.bringWindowForward(this.id);
  }

  removeWindow() {
    this.havenWindowService.removeWindow(this.id);
  }


  toggleMenu() {
    (this.menuState === 'active') ? this.menuState = 'notactive' : this.menuState = 'active';
  }

}


