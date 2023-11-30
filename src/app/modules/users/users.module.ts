import { NgModule } from '@angular/core';
import { userRoute } from './users.routes';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    userRoute,
    IonicModule,
    CommonModule,
    TranslateModule,
  ]
})
export class UsersModule { }
