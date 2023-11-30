import { StorageService } from '@core/services/storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';
import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';

@Component({
  selector: 'app-service-status-list',
  templateUrl: './service-status-list.component.html',
  styleUrls: ['./service-status-list.component.scss'],
})
export class ServiceStatusListComponent implements OnInit {

  @Input() item: any;
  items$!: Observable<any|undefined>;
  total!: number;
  language!: string;

  constructor(
    private uService: UtilsService,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    await this.getLanguage();
  }

  async openService(res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .7, .9],
      componentProps: { res },
      component: WaitingComponent
    });
  }

  private async getLanguage() {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.language = user.language;
    }
  }
}
