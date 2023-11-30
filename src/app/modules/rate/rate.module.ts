import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RateComponent } from './rate.component';
import { StarsWidgetModule } from './widgets/stars/stars.module';


@NgModule({
  declarations: [RateComponent],
  exports: [RateComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    StarsWidgetModule,
  ]
})
export class RateModule { }
