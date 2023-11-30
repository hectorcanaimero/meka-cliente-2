import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StatusOpenComponent } from './status-open.component';

@NgModule({
  exports: [StatusOpenComponent],
  declarations: [StatusOpenComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ]
})
export class StatusOpenModule { }
