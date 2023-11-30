import { Injectable } from '@angular/core';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class PushService {
  constructor(
    private ms: MasterService,
    private storage: StorageService,
  ) { }


  async initPush(): Promise<void> {
    await this.registerNotifications();
    this.addListeners();
    await this.getDeliveredNotifications();
  }

  async registerNotifications(): Promise<void> {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    await PushNotifications.register();
  };

  addListeners(): void {
    PushNotifications.addListener('registration', async (token: any) => {
      console.log('TOKEN VDD', token.value);
      await this.updateToken(token.value);
      await this.storage.setStorage('oPush', token.value);
    });
    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
    PushNotifications.addListener('pushNotificationReceived',
    async (notification: PushNotificationSchema): Promise<void> => {
      console.log('Push notification received: ', notification);
    });
    PushNotifications.addListener('pushNotificationActionPerformed', notification => { });
  };

  async getDeliveredNotifications(): Promise<void> {
    await PushNotifications.getDeliveredNotifications();
  };

  private async updateToken(push: string) {
    console.log('PUSH ', push);
    const user = await this.storage.getStorage('oUser');
    if(user) {
      this.ms.patch2Master(`users/${user._id}`, { push }).subscribe(() => null);
    }
  }
}
