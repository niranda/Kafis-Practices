import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService, JWTService } from '@practice/feature-login';
import { UserRoles } from '@practice/enums';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private jwt: JWTService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn && !this.jwt.isTokenExpired && this.jwt.getUserRole() === UserRoles.Admin) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
