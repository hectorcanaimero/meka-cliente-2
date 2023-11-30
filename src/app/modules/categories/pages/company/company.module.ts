import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CorePipeModule } from '@core/pipe/pipe.module';
import { CompanyModalComponent } from './company-modal.component';
import { StarsWidgetModule } from '@modules/rate/widgets/stars/stars.module';
import { CompanyViewModalModule } from '@modules/categories/pages/company-view-modal/company-view-modal.module';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [ { path: '', component: CompanyModalComponent } ];

@NgModule({
  exports: [CompanyModalComponent],
  declarations: [CompanyModalComponent],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    CorePipeModule,
    TranslateModule,
    StarsWidgetModule,
    GoogleMapsModule,
    CompanyViewModalModule,
    RouterModule.forChild(routes),

  ]
})
export class CompanyModule { }
