import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SideMenuWidgetComponent } from './side-menu-widget.component';


@NgModule({
  exports: [SideMenuWidgetComponent],
  declarations: [SideMenuWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ]
})
export class SideMenuWidgetModule { }
