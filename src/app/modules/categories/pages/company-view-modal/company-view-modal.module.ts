import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyViewModalComponent } from './company-view-modal.component';
// import { AgmCoreModule } from '@agm/core';
import { MomentModule } from 'ngx-moment';
import { StarsWidgetModule } from '@modules/rate/widgets/stars/stars.module';


@NgModule({
  exports: [CompanyViewModalComponent],
  declarations: [CompanyViewModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    // AgmCoreModule,
    MomentModule,
    StarsWidgetModule,
  ]
})

export class CompanyViewModalModule { }
