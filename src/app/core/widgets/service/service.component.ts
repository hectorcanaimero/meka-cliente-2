import { WaitingComponent } from '@modules/categories/pages/waiting/waiting.component';
import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';
import { Socket } from 'ngx-socket-io';
import { RateComponent } from '@modules/rate/rate.component';
import { CompanyModalComponent } from '@modules/categories/pages/company/company-modal.component';
import { ChatFireService } from '@core/services/chat-fire.service';
import { RoomChatPage } from '@modules/chat/pages/room/room.page';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements AfterViewInit {

  service$: Observable<any> = this.socket.fromEvent('changeMessage');
  total$!: Observable<number>;

  constructor(
    private socket: Socket,
    private uService: UtilsService,
    private chatFire: ChatFireService,
  ) { }
  ngAfterViewInit(): void {
    this.getData();

  }

  getData(): void {
    this.service$.subscribe(async (res: any) => this.unreadMessage(res._id));
  }

  async goToChat(uid: string) {
    await this.uService.modal({
      component: RoomChatPage,
      componentProps: { uid },
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .5, 1],
    });
  }

  unreadMessage(service: string) {
    this.total$ = this.chatFire.unReadMessages(1, service);
  }

  async goToOpenService() {
    await this.uService.modal({
      component: CompanyModalComponent,
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .5, .8, 1],
    });
  }

  openService(res: any){
    this.openWaiting(res);
  }

  private async openWaiting(res: any): Promise<void> {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 1,
      breakpoints: [0, .5, 1],
      component: WaitingComponent,
      componentProps: { res },
    });
  }


  private async setRating(res: any) {
    await this.uService.modal({
      mode: 'ios',
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.5, 1],
      component: RateComponent,
      componentProps: { service: res }
    });
  }
}
