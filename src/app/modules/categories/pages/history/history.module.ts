import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HistoryPage } from './history.page';
import { HistoryPageRoutingModule } from './history-routing.module';
import { HeaderModule } from '@core/widgets/header/header.module';
import { IntroWidgetModule } from '@core/widgets/intro/intro.module';
import { BannersWidgetModule } from '@core/widgets/banners/banners.module';
import { CategoriesWidgetModule } from '@modules/categories/widgets/home/home.module';
import { LastRepairedWidgetModule } from '@core/widgets/last-repaired/last-repaired.module';
import { ServiceStatusListModule } from '@modules/categories/widgets/service-status-list/service-status-list.module';
import { MomentModule } from 'ngx-moment';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    HeaderModule,
    CommonModule,
    MomentModule,
    IntroWidgetModule,
    BannersWidgetModule,
    CategoriesWidgetModule,
    ServiceStatusListModule,
    HistoryPageRoutingModule,
    LastRepairedWidgetModule,
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
