import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AppState } from '@store/app.state';
import { ConnectService } from '@modules/chat/services/connect.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  chats$!: Observable<any>;
  service$!: Observable<any>;
  total$!: Observable<number|any>;

  constructor(
    private nav: NavController,
    private conn: ConnectService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    // this.getServiceActive();
  }


  // getServiceActive = () => {
  //   this.service$ = this.store.select('item')
  //   .pipe(
  //     filter(row => !row.loading),
  //     map((res: any) => res.item),
  //     tap((res) => this.getChatNotification(res))
  //   );
  // };

  getChatNotification = (item: any) => {
    this.total$ = this.conn.unReadMessage(item).pipe(map((res: any) => res.length));
    this.total$.subscribe(res => console.log('CHAT ', res));
  };

  onGoToChat(service: any) {
    if(service.status === 'ACCEPTED') {
      this.nav.navigateRoot(`/chat/room/${service.code}/${service.company}`);
    }
  }
}
