import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHavenAppMenuHost]',
})
export class HavenAppMenuHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
