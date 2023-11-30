import { StorageService } from '@core/services/storage.service';
/* eslint-disable no-underscore-dangle */
import { AfterViewInit, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { Observable, timer } from 'rxjs';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-company-view-modal',
  templateUrl: './company-view-modal.component.html',
  styleUrls: ['./company-view-modal.component.scss'],
})
export class CompanyViewModalComponent implements AfterViewInit {

  @Input() service: any;
  @Input() provider: any;
  @Input() banner = false;
  @Input() fullHeight = false;
  language!: string;
  comments$!: Observable<any[]>;
  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

    async ngAfterViewInit() {
      this.getComments();
      await this.getLanguage();
    }

  onClose = (): Promise<boolean> =>
    this.uService.modalDimiss();

  async sendServiceByProvider(): Promise<void> {
    const data = { company: this.service._id, status: 'in_process' };
    await this.uService.alert({
      header: 'Info',
      message:this.translate.instant('DO_YOU_WANT_TO_SEND_THE_SERVICE_TO_THIS_PROVIDER'),
      buttons:[
        { text: 'Cancel', role: 'cancel', },
        { text: 'Okay', handler: async () =>
          this.send(this.service._id, data)  }
      ]
    });
  };

  getComments() {
    this.comments$ = this.ms.getMaster(`comments/company/${this.provider.user._id}`);
    this.comments$.subscribe(res => console.log(res));
  }

  private async getLanguage() {
    const { language } = await this.storage.getStorage('oUser');
    this.language = language;
  }

  private async send(id: string, data: any): Promise<void> {
    await this.uService.load({message: this.translate.instant('PROCESSING')});
    this.store.dispatch(actions.itemUpdate({ id, data }));
    this.uService.loadDimiss();
    this.uService.modalDimiss();
    this.uService.navigate('/pages/home');
  }
}
