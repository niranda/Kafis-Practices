import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@practice/feature-login';
import { UserRoles } from '@practice/enums';

import {MatDialog} from '@angular/material/dialog';
import {DateGradeSelectDialog} from 'apps/practice-ui-admin/src/app/features/shared/date-gradelevel-select-dialog.component';

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
    public dialog: MatDialog,
  ) { }


  public ngOnInit(): void {
    this.authService.succesfullSignIn$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.router.navigate([''],);
      this.dialog.open(DateGradeSelectDialog);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
