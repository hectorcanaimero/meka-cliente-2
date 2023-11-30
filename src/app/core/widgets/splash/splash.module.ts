import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SplashComponent } from './splash.component';

const app: Routes = [
  { path: '', component: SplashComponent }
];

@NgModule({
  declarations: [SplashComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(app)
  ]
})
export class SplashModule { }
