import { AlertController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) { }

  requestPermissions = () => {
    Geolocation.requestPermissions().then();
  };

  currentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  };

  currentPosition2 = () => {
    Geolocation.getCurrentPosition()
    .then(() => {})
    .catch(async (err) => {
      const alert = await this.alertCtrl.create({
        header: 'ERROR', mode: 'ios',
        message: 'You need to activate the GPS',
        buttons: [{
          text: 'OK',
          handler: (blah) => this.navCtrl.navigateRoot('pages/home')
        }]
      });
      await alert.present();
    });
  };
}
