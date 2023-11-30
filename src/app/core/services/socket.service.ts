import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  serviceCompany = this.socket.fromEvent('changeMessage');
  constructor(
    private socket: Socket,
    private store: Store<AppState>,
  ) {
    socket.connect();
  }

  getData() {
    this.socket.on('connection', (data: any) => {
      this.socket.fromEvent('changeMessage')
      .subscribe((message) => this.setStates(message));
    });
    this.socket.on('changeMessage', (data: any) => data);
  }

  getJoinSocketService(id: string) {
    this.socket.emit('join', id);
    this.socket.emit('serviceCompany', id);
  }

  setStates(res: any) {
    // if (res.status === 'in_process') {
    //   this.store.dispatch(actions.inProcessLoaded( { items: res }));
    // }
    // if (res.status === 'accepted') {
    //   this.store.dispatch(actions.acceptedLoaded( { items: res }));
    // }
  }
}
