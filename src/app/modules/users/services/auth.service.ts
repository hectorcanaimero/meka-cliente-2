import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Store, ReducerManager } from '@ngrx/store';
import { Storage, ref, deleteObject, uploadBytes, uploadString,
  uploadBytesResumable, percentage, getDownloadURL } from '@angular/fire/storage';

import { Login } from './interfaces';
import { MasterService } from '@core/services/master.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uploadPercent!: Observable<any>;
  constructor(
    private uploadStorage: Storage,
    private ms: MasterService,
    private navCtrl: NavController,
    private store: Store<AppState>,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private reducers: ReducerManager,

  ) { }

  //TODO: Autoriza el accesso
  signIn(data: Login): Observable<any> {
    return this.ms.postMaster('users/login-cliente', data);
  }

  // TODO: Crea un usuario
  signUp(data: any): Observable<Promise<boolean>> {
    return this.ms.postMaster( 'users', data).pipe(
      map(async (res: any): Promise<boolean> => {
        console.log(res);
        await this.storage.setStorage('oProfile', res);
        return this.navCtrl.navigateRoot('/user/signIn');
      })
    );
  }

  // TODO: Desloga la app
  async signOut(): Promise<boolean> {
    await this.storage.clearStorages();
    this.reducers.removeReducers([
      'user', 'item', 'rating',
      'expert', 'cancelled', 'finished',
      'score', 'banner',
    ]);
    return this.navCtrl.navigateRoot('/user/signIn');
  };

  // TODO: Get Countries
  getCountries = () => this.ms.getMaster('/tables/countries');

  changePassword(data: any): Observable<any> {
    return this.ms.postMaster('auth/change-password', data);
  }

  getSetting(): Observable<any> {
    return this.ms.getMaster('seeting/64638db16d976c758794e749');
  }

  forgotSenha(data: any): Observable<any> {
    return this.ms.postMaster('auth/forgot-password', data);
  }

  alertErr = async (message: string) => {
    const alert = await this.alertCtrl.create(
      { header: 'Error', message, buttons: ['OK'], mode:'ios'});
    await alert.present();
  };

  getRating = () => this.ms.getMaster('ratings/');

  async uploadAvatar(file: any | null): Promise<any> {
    let url;
    const filename = this.base64ToImage(file);
    const path = `avatar/${Date.now()}.png`; {
      if (file) {
        try {
          const storageRef = ref(this.uploadStorage, path);
          const task = uploadBytesResumable(storageRef, filename);
          this.uploadPercent = percentage(task);
          await task;
          url = await getDownloadURL(storageRef);
        } catch(e: any) {
          console.error(e);
        }
      }
      return url;
    }
  };

  private base64ToImage(dataURI: string) {
    const fileDate = dataURI.split(',');
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }
}
