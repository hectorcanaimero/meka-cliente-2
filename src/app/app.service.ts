import { AppInfo } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Device, DeviceInfo } from '@capacitor/device';
import {
  AppTrackingTransparency,
  AppTrackingStatusResponse,
} from 'capacitor-plugin-app-tracking-transparency';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation, ScreenOrientationResult } from '@capacitor/screen-orientation';
import { UtilsService } from '@core/services/utils.service';
import { TraslationService } from '@core/language/traslation.service';
import { AppUpdateProvider } from '@core/services/app-update.service';
import { AppUpdateInfo } from '@capawesome/capacitor-app-update';
import { PushService } from '@core/services/push.service';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  version$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private push: PushService,
    private platform: Platform,
    private uService: UtilsService,
    public traslate: TraslationService,
    private appUpdate: AppUpdateProvider,
  ) { }

    async initializeApp(): Promise<void> {
      if (Capacitor.isNativePlatform()) {
        await this.initializeAppUpdate();
        await this.screenOrientation();
        await this.push.initPush();
      }
    }


  setVersion$  = (items: AppInfo) => this.version$.next(items);

  getVersion$  = (): Observable<AppInfo> => this.version$.asObservable();


  async getLanguage(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Device.getLanguageCode();
      if (value) {
        this.traslate.use(value.split('-')[0]);
      } else {
        this.traslate.use('es');
      }
    } else {
      this.traslate.use('es');
    }
  };

  async showSplash() {
    await this.platform.ready();
    if (this.platform.is('ios')) {
      const lottie = (window as any).lottie;
      await lottie.splashscreen.hide();
      await lottie.splashscreen.show('public/assets/splash.json', false);
    }
  }

  closeModal() {
    this.uService.modalDimiss();
  }


  async validateTracking() {
    if (Capacitor.getPlatform() === 'ios') {
      const { status }: AppTrackingStatusResponse = await AppTrackingTransparency.getStatus();
      if (status !== 'authorized') {
        await AppTrackingTransparency.requestPermission();
      }
    }
  }

  private async screenOrientation(): Promise<void> {
    const orientation: ScreenOrientationResult = await ScreenOrientation.orientation();
    console.log('screenOrientation', orientation);
    await ScreenOrientation.lock({ orientation: 'portrait-primary' });
  }

  private async initializeAppUpdate(): Promise<void> {
    const appUpdateInfo: AppUpdateInfo = await this.appUpdate.getAppUpdateInfo();
    if (appUpdateInfo) {
      await this.appUpdate.performImmediateUpdate(appUpdateInfo);
    }
  }
}
