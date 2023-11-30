import { Component, OnInit } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import {  Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';
import { CompanyViewModalComponent } from '@modules/categories/pages/company-view-modal/company-view-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';


@Component({
  selector: 'app-widget-banner',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersWidgetComponent implements OnInit {

  entry$!: Observable<any>;
  options = {
    loop: true,
    speed: 600,
    autoplay: true,
    spaceBetween: 100,
    slidesPerView: 1,
  };

  constructor(
    private ms: MasterService,
    private uService: UtilsService,
    private store: Store<AppState>,
  ) { }

  async ngOnInit() {
    await this.getBanner();
  }

  getBanner(): void {
    this.entry$ = this.store.select('banner')
    .pipe(
      filter(flow => !flow.loading),
      map((res: any) => res.items)
    );
  };

  goToCompany(id: string) {
    this.ms.getMaster(`companies/${id}`)
    .subscribe(async (provider: any) => {
      if(provider) {
        await this.uService.modal({
          mode: 'ios',
          initialBreakpoint: 0.95,
          breakpoints: [0, 1, 1],
          component: CompanyViewModalComponent,
          componentProps: { provider, banner: true }
        });
      }
    });
  }
}
