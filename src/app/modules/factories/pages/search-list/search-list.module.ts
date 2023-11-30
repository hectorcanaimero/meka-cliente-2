import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SearchListPage } from './search-list.page';
import { HeaderModule } from '@core/widgets/header/header.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: SearchListPage, }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    HeaderModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SearchListPage],
  exports: [SearchListPage]
})
export class SearchListFactoriesModule {}
