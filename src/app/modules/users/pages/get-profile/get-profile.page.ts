import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '@modules/users/services/auth.service';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.page.html',
  styleUrls: ['./get-profile.page.scss'],
})
export class GetProfilePage implements AfterViewInit {

  load = true;
  user$!: Observable<any>;
  countries: any = [];
  segment = 'editar';

  constructor(
    private db: AuthService,
    private navCtrl: NavController,
    private store: Store<AppState>,
  ) { }

  ngAfterViewInit() {
    this.user$ = this.store.select('user')
    .pipe(filter(row => !row.loading), map((res: any) => res.user));
  }

  segmentChanged = (ev: any) => {
    this.segment = ev.detail.value;
  };

  onBack = () => this.navCtrl.navigateRoot('');
}
