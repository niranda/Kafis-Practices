import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@practice/environment';
import { UserErrorCode } from '@practice/enums';
import { UserAuthModel } from '../interfaces/user-auth-model';
import { UserResponse } from '../interfaces/user-response';

const userApiRequest = environment.API.auth;

@Injectable()
export class AuthService {
  public succesfullSignIn$ = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private cookie: CookieService) { }

  public getAuthErrorMessages() {
    return {
      [UserErrorCode.InvalidLogin]: this.translate.instant('ERROR_MESSAGES.INVALID_LOGIN'),
      [UserErrorCode.InvalidPassword]: this.translate.instant('ERROR_MESSAGES.INVALID_PASSWORD')
    };
  }

  public get isLoggedIn(): boolean {
    return !!this.cookie.get('Token');
  }

  public logout(): void {
    this.cookie.delete('Token', '/');
    this.router.navigate(['/auth']);
    localStorage.clear();
  }

  public login(user: UserAuthModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${userApiRequest}/Login`, user, { withCredentials: true }).pipe(
      tap(() => {
        this.succesfullSignIn$.next();
      })
    );
  }
}
