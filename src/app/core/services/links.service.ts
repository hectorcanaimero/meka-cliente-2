import { Injectable } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(
    private nav: NavController,
    private menu: MenuController,
  ) { }

  onLink = (url: string) => {
    this.menu.close();
    this.nav.navigateRoot(url);
  };

  onLinkFade = (url: string) => {
    this.nav.setDirection('root', false);
    this.nav.navigateRoot(url);
  };
}
