import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@practice/feature-login';
import { UserRoles } from '@practice/enums';

@Component({
  selector: 'admin-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public readonly userRoles = UserRoles;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.authService.succesfullSignIn$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
