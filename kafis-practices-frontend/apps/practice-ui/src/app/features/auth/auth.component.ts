import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { AuthService, JWTService } from '@practice/feature-login';
import { UserRoles } from '@practice/enums';

@Component({
  selector: 'practice-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public readonly userRoles = UserRoles;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookie: CookieService,
    private jwtService: JWTService
  ) { }

  public ngOnInit(): void {
    this.redirectAuthorizedUser();
    this.authService.succesfullSignIn$.pipe(
      takeUntil(this.destroy$)).subscribe(() => {
      this.redirectAuthorizedUser();
    });
  }

  private redirectAuthorizedUser(): void {
    this.jwtService.setToken(this.cookie.get('Token'));
    if (this.jwtService.getUserRole() === UserRoles.Student) {
      this.router.navigate(['student']);
    }
    else if(this.jwtService.getUserRole() === UserRoles.Teacher) {
      this.router.navigate(['teacher']);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

