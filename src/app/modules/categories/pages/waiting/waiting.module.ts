import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CorePipeModule } from '@core/pipe/pipe.module';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { StarsWidgetModule } from '@modules/rate/widgets/stars/stars.module';
import { GoogleMapsModule } from '@angular/google-maps';

const app: Routes = [
  { path: '', component: WaitingComponent }
];

@NgModule({
  exports: [WaitingComponent],
  declarations: [WaitingComponent],
  imports: [
    IonicModule,
    CommonModule,
    CorePipeModule,
    TranslateModule,
    GoogleMapsModule,
    StarsWidgetModule,
    RouterModule.forChild(app)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WaitingModule { }
