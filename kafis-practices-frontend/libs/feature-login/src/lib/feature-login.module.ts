import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { UiElementsModule } from '@practice/ui/components/ui-elements';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    UiElementsModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class FeatureLoginModule {
  static forRoot(): ModuleWithProviders {
  return {
    ngModule: FeatureLoginModule,
    providers: [
      AuthService,
      JWTService
    ]
  };
}}
