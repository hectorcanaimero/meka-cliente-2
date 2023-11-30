import { Component, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  finished$!: Observable<any>;
  cancelled$!: Observable<any>;
  toggle = 'HISTORY';
  progress = true;
  totalFinished = 0;
  totalCancelled = 0;

  constructor(
    private store: Store<AppState>,
    private storage: StorageService,
  ){}

  async ngOnInit(): Promise<void> {
    await this.getData();
    this.getFinished();
    this.getCancelled();
  }

  progressBar(res: any) {
    const length = res.length;
    if(length === 0) {
      timer(1200).subscribe(() => this.progress = false);
    } else {
      timer(1000).subscribe(() => this.progress = false);
    }
  }

  getFinished() {
    // this.ms.getMaster('')
    this.finished$ = this.store.select('finished')
    .pipe(
      filter(row => !row.loading),
      tap(({ finished }) => {
        this.totalFinished = finished.length;
        this.progressBar(finished);
      }),
      map((res: any) => res.finished)
    );
    this.finished$.subscribe((res) => console.log('FINISHED', res.length));
  }

  async getData(): Promise<void> {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.store.dispatch(actions.finishedLoad({ user: user._id }));
      this.store.dispatch(actions.cancelledLoad({ user: user._id }));
    }
  }

  getCancelled() {
    this.cancelled$ = this.store.select('cancelled')
    .pipe(
      filter(row => !row.loading),
      tap(({ cancelled }) => {
        this.totalCancelled = cancelled.length;
        this.progressBar(cancelled);
      }),
      map(res => res.cancelled)
    );
    this.cancelled$.subscribe((res) => console.log('CANCELLED', res));
  }

  segmentChanged(ev: any) {
    this.toggle = ev.detail.value;
  }
}
