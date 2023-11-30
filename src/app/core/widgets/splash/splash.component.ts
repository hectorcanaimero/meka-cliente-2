import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { timer } from 'rxjs';
import { StatusBar, Style } from '@capacitor/status-bar';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(
    private nav: NavController
  ) { }

  ionViewDidEnter() {}

  ngOnInit() {
    timer(3000).subscribe(async () => {
      this.nav.navigateRoot('/pages/home');
      await StatusBar.show();
      await StatusBar.setStyle({ style: Style.Light });
    });

  }

}
