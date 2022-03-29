import { environment } from '@practice/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [HomeComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'uk' }]
})
export class HomeModule { }
