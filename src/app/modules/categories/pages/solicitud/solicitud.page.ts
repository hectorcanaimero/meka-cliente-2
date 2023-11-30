import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-solicitud',
  templateUrl: 'solicitud.page.html',
  styleUrls: ['solicitud.page.scss'],
})

export class SolicitudPage implements OnInit {
  autoPart = false;
  towTruck = false;
  service$!: Observable<any>;
  service = false;
  expert!: number;
  segment = 'mechanics';

  constructor(
    activate: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    activate.paramMap.subscribe((res: any) => this.expert = res.params.id);
  }

  ngOnInit(): void {
    this.getService();
    this.getAutoParts();
  }

  getAutoParts() {
    this.store.select('expert').pipe(
      filter(row => !row.loading),
      map(({ items }: any) => items),
    ).subscribe((res: any) => {
      const fill = res.filter((row: any) => row._id === this.expert && row.name === 'Auto Part');
      const fill1 = res.filter((row: any) => row._id === this.expert && row.name === 'Tow truck');
      this.autoPart = fill.length > 0 ? true : false;
      this.towTruck = fill1.length > 0 ? true : false;
    });
  }

  getService = () => {
    this.service$ = this.store.select('item')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => {
        this.serviceActive(res.item);
        return res.item;
      }),
    );
  };

  serviceActive(service: any) {
    if (service !== null) {
      this.service = true;
    }
  }

  segmentChanged = (ev: any) => this.segment = ev.detail.value;
}
