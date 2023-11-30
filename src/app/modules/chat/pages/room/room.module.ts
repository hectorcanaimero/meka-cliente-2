import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomChatPage } from './room.page';
import { CoreModule } from '@core/core.module';
import { LanguageModule } from '@core/language/language.module';
import { MessageWidgetModule } from '../../widget/message/message.module';

const routes: Routes = [
  { path: ':uid', component: RoomChatPage }
];

@NgModule({
  imports: [
    CoreModule,
    IonicModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    LanguageModule,
    MessageWidgetModule,
    RouterModule.forChild(routes),
  ],
  exports: [RoomChatPage],
  declarations: [RoomChatPage],
})
export class RoomChatPageModule {}
