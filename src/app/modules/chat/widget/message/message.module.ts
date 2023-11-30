
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MessageChatComponent } from './message.component';
import { MomentModule } from 'ngx-moment';
@NgModule({
  declarations: [MessageChatComponent],
  exports: [MessageChatComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
  ],
  providers: []
})
export class MessageWidgetModule { }
