import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

import { FeatureLoginModule } from '@practice/feature-login';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FeatureLoginModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  providers: [CookieService]
})
export class AuthModule { }
