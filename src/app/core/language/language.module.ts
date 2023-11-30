import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import { TraslationService } from './traslation.service';

export function createTranslateLoader(http: HttpClient) {
  const prefix = 'https://api.meka.do/api/v2/language/type/1/name/';
  return new TranslateHttpLoader(http, prefix, '');
}

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
      }
    })
  ],
  providers: [TraslationService],
})
export class LanguageModule { }
