import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { Socket } from 'ngx-socket-io';
import { PushService } from './push.service';

@Injectable({
  providedIn: 'root'
})

export class IntegratedService {
  private constructor(
    private socket: Socket,
    private ms: MasterService,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
    private pushService: PushService,
  ) {

  }
  async initStates(): Promise<any> {
    const user = await this.storage.getStorage('oUser');
    this.store.dispatch(actions.expertLoad());
    if (user) {
      this.socket.emit('joinUser', user._id);
      this.socket.emit('serviceUser', user._id);
      this.store.dispatch(actions.loadUser(user));
      this.store.dispatch(actions.itemLoad({ user: user._id }));
      this.store.dispatch(actions.initScore({ user: user._id }));
      this.store.dispatch(actions.finishedLoad({ user: user._id }));
      this.store.dispatch(actions.cancelledLoad({ user: user._id }));
    } else {
      return null;
    }
  };

  pageStates() {
    this.store.dispatch(actions.expertLoad());
  }

  // INGRESA EL ROOM SI EL SERVICIO ESTA ABIERTO
  onServiceStatus() {
    this.store.select('item')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.item)
    )
    .subscribe((res: any) => {
      if (res) {
        this.navigateWithStatus(res);
      }
    });
  }

  async setTokenPushOnUser() {
    const oUser = await this.storage.getStorage('oUser');
    const oPush = await this.storage.getStorage('oPush');
    if (oPush) {
      this.ms.patch2Master(`users/${oUser._id}`, { push: oPush }).subscribe(() => {});
    }
  }

  private async navigateWithStatus(service: any) {
    const status = service.status;
    if (status === 'open') {
      this.uService.navigate('service-open');
    }
  }

  // private async setRating(res: any) {
  //   await this.uService.modal({
  //     mode: 'ios',
  //     initialBreakpoint: 0.9,
  //     breakpoints: [0, 0.5, 1],
  //     component: RateComponent,
  //     componentProps: { service: res }
  //   });
  // }
}
