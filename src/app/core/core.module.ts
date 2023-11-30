import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';
import ApiInterceptor from '@core/services/http.interceptor';
import { LanguageModule } from '@core/language/language.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MomentModule,
    LanguageModule,
    TranslateModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class CoreModule { }
