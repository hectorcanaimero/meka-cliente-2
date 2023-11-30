import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { categoriesRoute } from 'src/app/modules/categories/categories.routes';
import { WaitingModule } from '@modules/categories/pages/waiting/waiting.module';



@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    categoriesRoute,
    WaitingModule
  ]
})
export class CategoriesModule { }
