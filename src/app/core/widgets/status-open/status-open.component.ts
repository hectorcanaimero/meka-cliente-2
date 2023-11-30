import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { Component, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UtilsService } from '@core/services/utils.service';
import { RateComponent } from '@modules/rate/rate.component';
import { CompanyModalComponent } from '@modules/categories/pages/company/company-modal.component';

@Component({
  selector: 'app-status-open',
  templateUrl: './status-open.component.html',
  styleUrls: ['./status-open.component.scss'],
})
export class StatusOpenComponent implements AfterViewInit {

  service$!: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private uService: UtilsService,
  ) { }
  ngAfterViewInit(): void {
    this.getData();
  }
  getData(): void {
    this.service$ = this.store.select('item')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.item)
    );
  }
  async goToOpenService() {
    await this.uService.modal({
      component: CompanyModalComponent,
      componentProps: { header: true },
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .5, .8, 1],
      showBackdrop: false,
    });
  }

  async setRating(res: any) {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.5, 1],
      component: RateComponent,
      componentProps: { service: res }
    });
  }
}
