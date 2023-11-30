import { Injectable } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController,
  AlertOptions, ModalOptions, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({   providedIn: 'root' })
export class UtilsService {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  navigate(url: string) {
    return this.navCtrl.navigateRoot(url);
  }

  alert = async (opts: AlertOptions): Promise<void> => {
    const item: HTMLIonAlertElement = await this.alertCtrl.create(opts);
    item.present();
  };

  modal = async (opts: ModalOptions): Promise<void> => {
    const item: HTMLIonModalElement = await this.modalCtrl.create(opts);
    item.present();
  };

  modalDimiss = () => this.modalCtrl.dismiss();

  load = async (opts: LoadingOptions): Promise<void> => {
    const item: HTMLIonLoadingElement = await this.loadCtrl.create(opts);
    item.present();
  };

  loadDimiss = () => this.loadCtrl.dismiss();

  toast = async (opts: ToastOptions): Promise<void> => {
    const item: HTMLIonToastElement = await this.toastCtrl.create(opts);
    item.present();
  };

  toastDimiss = () => this.toastCtrl.dismiss();

  distance(positionA: Position, positionB: Position): number {
    const radius: any = 0.017453292519943295;
    const cos: any = Math.cos;
    const temp: number =
      0.5 -
      cos((positionA.latitude - positionB.latitude) * radius) / 2 +
      (cos(positionB.latitude * radius) *
        cos(positionA.latitude * radius) *
        (1 - cos((positionA.longitude - positionB.longitude) * radius))) /
        2;
    const asin: number = 12742 * Math.asin(Math.sqrt(temp));
    const total = ((asin * 100) / 100).toFixed(2);
    return +total;
  }
}

export interface Position {
  latitude: number;
  longitude: number;
}
