import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor( private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.authenticated) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
