import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';

import { ServiceStatusListComponent } from './service-status-list.component';
import { CompanyModule } from '@modules/categories/pages/company/company.module';

@NgModule({
  exports: [ServiceStatusListComponent],
  declarations: [ServiceStatusListComponent],
  imports: [
    IonicModule,
    CommonModule,
    MomentModule,
    CompanyModule,
    TranslateModule,
  ]
})
export class ServiceStatusListModule { }
