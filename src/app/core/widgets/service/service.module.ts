import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ServiceComponent } from './service.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  exports: [ServiceComponent],
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ]
})
export class ServiceModule { }
