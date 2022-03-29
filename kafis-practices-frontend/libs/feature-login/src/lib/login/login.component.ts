import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

import { UserRoles } from '@practice/enums';
import { UserAuthModel } from '../interfaces/user-auth-model';
import { UserResponse } from '../interfaces/user-response';
import { JWTService } from '../services/jwt.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'practice-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly translateLoggedIn = this.translate.instant('NOTIFICATIONS.LOGGED_IN');
  private readonly translateUnauthorized = this.translate.instant('NOTIFICATIONS.UNAUTHORIZED');
  private readonly translateAuthSuccess = this.translate.instant('NOTIFICATIONS.AUTHENTICATION_SUCCESS');
  private readonly translateAuthFailed = this.translate.instant('NOTIFICATIONS.AUTHENTICATION_FAILED');

  private user: UserAuthModel = {
    username: '',
    password: ''
  };
  @Input() requiredRole = [UserRoles.Student, UserRoles.Teacher];

  private authErrorMessages: {};
  public loginFormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private cookie: CookieService,
    private jwtService: JWTService) { }

  public ngOnInit(): void {
    this.authErrorMessages = this.authService.getAuthErrorMessages();
  }

  public onSubmit(): void {
    this.user.username = this.loginFormGroup.get('username').value;
    this.user.password = this.loginFormGroup.get('password').value;

    this.authService.login(this.user).subscribe((response: UserResponse) => {
      if (response.isSuccess) {
        this.jwtService.setToken(this.cookie.get('Token'));
        if (this.requiredRole.some(e => e == (this.jwtService.getUserRole())))
        {
          this.toastrService.success(this.translateLoggedIn, this.translateAuthSuccess);
        }
        else {
          this.cookie.delete('Token', '/');
          this.toastrService.error(this.translateUnauthorized, this.translateAuthFailed);
        }
      }
      else {
        this.toastrService.error(this.authErrorMessages[response.errorMessage], this.translateAuthFailed);
      }
    },
    exception => {
      this.toastrService.error(exception.message, this.translateAuthFailed);
    });
  }
}
