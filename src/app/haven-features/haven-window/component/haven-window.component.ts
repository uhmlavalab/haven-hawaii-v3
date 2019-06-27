import { Component, AfterContentInit, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';

import { HavenWindowService } from '../services/haven-window.service';

import { HavenWindow } from '../shared/haven-window';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { HavenScenarioService, Scenario } from '@app/haven-features/haven-scenario';
import { HavenAppsService } from '@app/haven-features/haven-apps/haven-apps.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-haven-window',
  templateUrl: './haven-window.component.html',
  styleUrls: ['./haven-window.component.css'],
  providers: [],
  animations: [
    trigger('menuOpen', [
      state('notactive', style({ bottom: '-50px' })),
      state('active', style({ bottom: '-250px' })),
      transition('notactive <=> active', animate('750ms'))
    ]),
  ],

})
export class HavenWindowComponent extends HavenWindow implements AfterContentInit, OnInit {

  menuState = 'notactive';
  lockState = true;
  year = 0;
  renewablePercent = 0;

  appSub: Subscription;

  @ViewChild('windowDiv', { static: true }) windowDiv: ElementRef;

  constructor(private havenWindowService: HavenWindowService, private scenarioService: HavenScenarioService, private appService: HavenAppsService) {
    super();
  }

  ngOnInit(): void {
    this.appService.addAppSubject(this.id);
    this.appSub = this.appService.getAppSubject(this.id).subscribe(data => {
      if (data.hasOwnProperty('year')) {
        this.year = data.year;
      }
      if (data.hasOwnProperty('re')) {
        this.renewablePercent = data.re;
      }
    });
    this.scenarioService.getScenarioReference(this.scenario.id).onSnapshot(value => {
      const scenario = value.data() as Scenario;
      this.scenario = scenario;
      this.name = this.scenario.name;
      this.color = this.scenario.color;
    });
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
    this.appSub.unsubscribe();
    this.havenWindowService.removeWindow(this.id);
  }


  toggleMenu() {
    (this.menuState === 'active') ? this.menuState = 'notactive' : this.menuState = 'active';
  }

  lockWindow() {
    this.lockState = !this.lockState;
  }

}


