import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MomentModule } from 'ngx-moment';

import { RoomsChatPage } from './rooms.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { RoomsChatPageRoutingModule } from './rooms-routing.module';
import { DirectivesModule } from '@core/directives/directives.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    MomentModule,
    DirectivesModule,
    RoomsChatPageRoutingModule
  ],
  exports: [RoomsChatPage],
  declarations: [RoomsChatPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomsChatPageModule {}
