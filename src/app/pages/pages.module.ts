import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PagesPage } from './pages.page';
import { pagesRoute } from './pages.routes';
import { RateModule } from '@modules/rate/rate.module';

@NgModule({
  imports: [
    pagesRoute,
    RateModule,
    IonicModule,
    FormsModule,
    CommonModule,
    TranslateModule,
  ],
  declarations: [PagesPage]
})
export class PagesPageModule {}
