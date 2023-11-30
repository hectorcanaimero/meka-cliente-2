import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SolicitudPage } from './solicitud.page';
import { PartsComponent } from './../../widgets/parts/parts.component';
import { SolicitudPageRoutingModule } from './solicitud-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { MechanicsComponent } from '../../widgets/mechanics/mechanics.component';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    TranslateModule,
    ReactiveFormsModule,
    SolicitudPageRoutingModule,
  ],
  declarations: [
    SolicitudPage,
    PartsComponent,
    MechanicsComponent,
  ],
  exports: [SolicitudPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SolicitudCategoriesModule {}
