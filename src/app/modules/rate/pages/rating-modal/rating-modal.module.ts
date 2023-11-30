import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StarsWidgetModule } from '../../widgets/stars/stars.module';
import { RatingModalComponent } from './rating-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: RatingModalComponent }];

@NgModule({
  exports: [RatingModalComponent],
  declarations: [RatingModalComponent],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    TranslateModule,
    StarsWidgetModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RatingModalModule { }
