import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@modules/users/services/auth.service';
import { filter, map, Observable, timer } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Browser, OpenOptions } from '@capacitor/browser';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-side-menu-widget',
  templateUrl: './side-menu-widget.component.html',
  styleUrls: ['./side-menu-widget.component.scss'],
})
export class SideMenuWidgetComponent implements OnInit {

  @Input() appVersion: any;
  user$!: Observable<any>;
  score$!: Observable<any>;
  user: any;
  appPages = [
    { title: 'Home', url: '/home', },
    { title: 'Roster', url: '/roster' }
  ];

  menus = [ 'SIDEMENU.TERM_OF_USE' ];

  social = [
    {
      icon: 'logo-facebook',
      name: 'SIDEMENU.FANPAGE_FB',
      url: 'https://www.facebook.com/Meka-108821827303515'
    }
  ];


  constructor(
    private ms: MasterService,
    private menu: MenuController,
    private uService: UtilsService,
    private store: Store<AppState>,
    private authService: AuthService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.user$ = this.getUser$();
  }

  getUser$(): Observable<any> {
    return this.store.select('user')
    .pipe(
      filter((row) => !row.loading),
      map(({ user }) => user)
    );
  }

  async onRemove(id: string) {
    await this.uService.alert({
      header: 'Info',
      message: this.translate.instant('REMOVE_USER'),
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.ms.patchMaster('users', id, { status: false }).subscribe(async (res: any)=> {
              console.log(res);
              await this.signOut();
            });
          },
        },
      ]
    });
  }

  async signOut(): Promise<void> {
    this.menu.close();
    await this.uService.load({ duration: 1500, message: 'Loading...' });
    this.authService.signOut();
  };

  onLink(url: string): void {
    this.menu.close();
    this.uService.navigate(url);
  }

  onModalChat(): void {
    this.uService.navigate('chat/soporte');
  };

  async onAppRate(): Promise<void>{
  };

  async openBrowser(url: string): Promise<void>{
    const options: OpenOptions = { url, toolbarColor: '#222428' };
    await Browser.open(options);
  };

  getName(first: string, last: string): string {
    if (first) {
      const a = first.slice(0,1);
      const b = last.slice(0,1);
      const value = a + b;
      return value;
    }
    return `mk`;
  };
}
