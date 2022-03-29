import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@practice/feature-login';

@Component({
  selector: 'practice-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.scss']
})
export class LogoutConfirmationDialogComponent {
  private readonly translateLoggedIn = this.translate.instant('NOTIFICATIONS.LOGGED_OUT');
  private readonly translateAuthSuccess = this.translate.instant('NOTIFICATIONS.LOGOUT_SUCCESS');

  constructor(private toastrService: ToastrService,
              private translate: TranslateService,
              private authService: AuthService) { }

  public onLogout(): void {
    this.authService.logout();
    this.toastrService.success(this.translateLoggedIn, this.translateAuthSuccess);
  }
}
