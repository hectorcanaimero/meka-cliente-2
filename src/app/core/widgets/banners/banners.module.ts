import { IonicModule } from '@ionic/angular';
import { BannersWidgetComponent } from './banners.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [BannersWidgetComponent],
  exports: [BannersWidgetComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannersWidgetModule { }
