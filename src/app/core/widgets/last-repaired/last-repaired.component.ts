import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@store/app.state';
import { ServiceModel } from '@core/model/solicitud.interfaces';
import { ModalController } from '@ionic/angular';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { CompanyModalComponent } from '@modules/categories/pages/company/company-modal.component';

@Component({
  selector: 'app-last-repaired-widget',
  templateUrl: './last-repaired.component.html',
  styleUrls: ['./last-repaired.component.scss'],
})
export class LastRepairedWidgetComponent implements OnInit, AfterViewInit {

  @Input() titulo!: string;
  @Input() status!: string;
  loading = true;
  options = {
    loop: true,
    autoplay: true,
    freemode: true,
    spaceBetween: 20,
    slidesPerView: 1.1,
  };

  services$!: Observable<ServiceModel[]>;
  constructor(
    private store: Store<AppState>,
    private modalCrtl: ModalController,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  openService = (res: any) => {
    if (this.status === 'OPEN') {
      this.companyModal(res);
    } else {
      this.waitingModal(res);
    }
  };

  waitingModal = async (res: any) => {
    const modal = await this.modalCrtl.create({
      component: WaitingComponent,
      componentProps: { res }
    });
    modal.present();
  };
  companyModal = async (res: any) => {
    const modal = await this.modalCrtl.create({
      component: CompanyModalComponent,
      componentProps: { res }
    });
    modal.present();
  };
}
