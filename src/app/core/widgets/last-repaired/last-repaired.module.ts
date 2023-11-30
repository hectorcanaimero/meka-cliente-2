import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MomentModule } from 'ngx-moment';
import { TranslateModule } from '@ngx-translate/core';

import { WaitingModule } from '@modules/categories/pages/waiting/waiting.module';
import { CompanyModule } from '@modules/categories/pages/company/company.module';
import { LastRepairedWidgetComponent } from '@core/widgets/last-repaired/last-repaired.component';

@NgModule({
  declarations: [LastRepairedWidgetComponent],
  exports: [LastRepairedWidgetComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
    WaitingModule,
    CompanyModule,
    TranslateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LastRepairedWidgetModule { }
