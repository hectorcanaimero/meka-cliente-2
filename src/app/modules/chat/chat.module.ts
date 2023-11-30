import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '@core/language/language.module';

import { chatRoute } from './chat.routes';

@NgModule({
  imports: [
    chatRoute,
    IonicModule,
    CommonModule,
    TranslateModule,
    LanguageModule,
  ],
  providers: []
})
export class ChatModule { }
