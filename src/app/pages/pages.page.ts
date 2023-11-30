import { Capacitor } from '@capacitor/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IntegratedService } from '@core/services/integrated.service';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as actions from  '@store/actions';
import { PushService } from '@core/services/push.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit, AfterViewInit {

  count: number = 0;
  chats$!: Observable<any>;
  notification = false;
  total$!: Observable<number|any>;

  constructor(
    private store: Store<AppState>,
    private pushService: PushService,
    private intService: IntegratedService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.intService.initStates();
    this.intService.pageStates();
    await this.getBanner();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setPushToken();
    await this.intService.setTokenPushOnUser();
  }

  async getBanner(): Promise<any> {
    const position: Position = await Geolocation.getCurrentPosition();
    if (position) {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.store.dispatch(actions.bannerLoad({ data }));
    }
  }

  async setPushToken(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      console.log((Capacitor.getPlatform()));
      await this.pushService.initPush();
    }
  }
}
