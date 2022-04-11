import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

import { JWTService } from '@practice/feature-login';
import { AuthService } from '@practice/feature-login';
import { routingAnimation } from '@practice/ui/components/ui-elements';
import { LogoutConfirmationDialogComponent } from '@practice/ui/components/dialogs';
import {DateGradeSelectDialog} from 'apps/practice-ui-admin/src/app/features/shared/date-gradelevel-select-dialog.component';


@Component({
  selector: 'practice-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation]
})
export class AppComponent {

  constructor(private translate: TranslateService,
              private cookie: CookieService,
              private jwt: JWTService,
              private dialog: MatDialog,
              public authService: AuthService) {
    this.jwt.setToken(this.cookie.get('Token'));

    this.translate.addLangs(['uk']);
    this.translate.setDefaultLang('uk');
    this.translate.use('uk');
  }

  public getAnimationData(outlet: RouterOutlet): string | null {
    return outlet.activatedRouteData.state ? outlet.activatedRouteData.state : null;
  }
  openDialog(): void{
    this.dialog.open(DateGradeSelectDialog);
  }
  public onLogout(): void {
    this.dialog.open(LogoutConfirmationDialogComponent);
  }
}
