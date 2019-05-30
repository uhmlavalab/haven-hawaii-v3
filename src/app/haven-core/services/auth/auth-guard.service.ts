import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSerivce: AuthService, private router: Router, private ngZone: NgZone) { }

  canActivate(route: ActivatedRouteSnapshot, ) {
    if (this.authSerivce.isAuthenticated()) {
      return true;
    } else {
      this.ngZone.run(() => this.router.navigate(['/login'])).then();
      return false;
    }
  }

}
