import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})
export class HistoryPage implements OnInit{

  load = true;
  total = 0;
  items$!: Observable<any>;
  toggle = '';

  constructor(
    private store: Store<AppState>,
    private db: DbCategoriesService,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    // this.loadData();
  }

  // loadData = () => {
  //   const items$ = this.store.select('history').pipe(
  //     delay(500),
  //     tap(({ loading, total }) => {
  //       this.load = loading;
  //       this.total = total;
  //     }),
  //     map((res: any) => res.history),
  //   );
  //   items$.subscribe((res) => this.listService(res));
  // };

  // listService = (service: any) => {
  //   this.items$ = undefined;
  //   const items = zip( of(service), this.db.getIcone() ).pipe(
  //     map((x: any) => {
  //       const data = [];
  //       x[0].forEach(el => {
  //         el.expert_icon = x[1].filter((row: any) => row.name === el.type_expert)[0].picture;
  //         data.push(el);
  //       });
  //       return data;
  //     }),
  //   );
  //   this.items$ = items;
  // };


  // doRefresh(ev: any) {
  //   timer(1000).subscribe(() => {
  //     this.loadData();
  //     ev.target.complete();
  //   });
  // }

  // openService = async (res: any) => {
  //   const modal = await this.modalCtrl.create({
  //     component: WaitingComponent,
  //     componentProps: { res }
  //   });
  //   await modal.present();
  // };
}
