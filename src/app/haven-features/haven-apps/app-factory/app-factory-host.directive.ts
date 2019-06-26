import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHavenAppHost]',
})
export class HavenAppHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
