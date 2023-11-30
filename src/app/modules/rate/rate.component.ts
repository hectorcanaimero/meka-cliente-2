/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { MasterService } from '@core/services/master.service';
import { UtilsService } from '@core/services/utils.service';
import { AppState } from '@store/app.state';
import * as actions from '@store/actions';
import { filter, map, Observable, timer } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit {

  @Input() service: any;
  activeButton = false;
  comments!: string;
  score = 4;

  constructor(
    private socket: Socket,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getService();
  }

  async onSubmit(): Promise<void> {
    await this.uService.load({message: this.translate.instant('PROCCESSING'), duration: 500});
    this.getService().subscribe((item: any) => {
      item.status = 'closed';
      const data = { id: item._id, data: item };
      this.store.dispatch(actions.itemClosed(data));
      this.sendComments(item.comment._id);
    });
  }

  getStar(ev: number): void {
    this.score = ev;
  }

  private sendComments(id: string) {
    const body = {
      score_company: this.score,
      comment_company: this.comments || '',
    };
    this.ms.patch2Master(`comments/${id}`, body).subscribe((res) => {
      timer(300).subscribe(() => this.uService.modalDimiss());
    });
  }

  private getService() {
    const data$: Observable<any> = this.store.select('item')
      .pipe(
        filter(row => !row.loading),
        map(({ item }: any) => {
          if (item.status === 'finished') {
            return item;
          }
        })
      );
    data$.subscribe(res => console.log(res));
    return data$;
  }
}
