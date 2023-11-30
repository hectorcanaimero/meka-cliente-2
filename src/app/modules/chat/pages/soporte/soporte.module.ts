import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { SoporteChatPage } from './soporte.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { MessageWidgetModule } from '@modules/chat/widget/message/message.module';
import { LanguageModule } from '@core/language/language.module';

const routes: Routes = [
  { path: '', component: SoporteChatPage, }
];

@NgModule({
  imports: [
    CoreModule,
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    TranslateModule,
    LanguageModule,
    ReactiveFormsModule,
    MessageWidgetModule,
    RouterModule.forChild(routes),
  ],
  exports: [SoporteChatPage],
  declarations: [SoporteChatPage],
})
export class SoporteChatPageModule {}
