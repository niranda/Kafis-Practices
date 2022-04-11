import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

import { FeatureLoginModule } from '@practice/feature-login';
import { CommonServiceModule, HeadersInterceptor } from '@practice/common';
import { UiElementsModule } from '@practice/ui/components/ui-elements';
import { UiComponentsHeaderModule } from '@practice/ui/components/header';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { appInitializerFactory } from '@practice/utils';
import {MaterialModule} from 'apps/practice-ui-admin/src/app/features/shared/date-gradelevel-select-dialog.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeatureLoginModule.forRoot(),
    CommonServiceModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    }),
    UiElementsModule,
    UiComponentsHeaderModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MaterialModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [TranslateService, Injector],
    multi: true
  },
  { provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule {}
