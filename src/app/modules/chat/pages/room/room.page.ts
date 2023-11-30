import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { ChatFireService } from '@core/services/chat-fire.service';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';
import { MasterService } from '@core/services/master.service';

@Component({
  selector: 'app-room-hat',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss'],
})
export class RoomChatPage implements OnInit {
  @Input() uid!: string;
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  activeMessage = false;
  public users = 0;
  public message = '';
  public messages: string[] = [];
  public messages$!: Observable<any[]>;
  service: any;

  constructor(
    private uService: UtilsService,
    private storage: StorageService,
    private msService: MasterService,
    private activatedRoute: ActivatedRoute,
    private chatFireService: ChatFireService,
    private storageService: FireStorageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({uid}) => {
      if (uid) {
        this.getData(uid);
      } else {
        this.getData(this.uid);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if(this.message) {
      await this.sendMessage('MSG', this.message);
      this.sendPush();
      this.message = '';
    }
  }

  sendPush() {
    const data = {
      token: this.service.company.user.push,
      title: `Tienes un mensaje de ${this.service.user.first_name}`,
      body: `${this.message.slice(0, 50)}...`,
    };
    console.log(data);
    this.msService.postMaster('services/push/chat', data)
      .subscribe((res) => console.log(res));
  }

  getMessage(uid: string) {
    this.messages$ = this.chatFireService.getMessages(uid);
    this.scrollToBottomLabel();
  }

  scrollToBottomLabel() {
    const id = document.getElementById('id-0');
    // console.log(id);
    // this.content.scrollToPoint(0,id.offsetTop-60,700);
  }

  async setCamera() {
    const image = await Camera.getPhoto({
      width: 500, height: 500, quality: 60, allowEditing: false, resultType: CameraResultType.DataUrl
    });
    const url = await this.storageService.upload(this.uid, image.dataUrl);
    if(url) {
      await this.sendMessage('IMG', url);
    }
  }

  onClose(): void {
    this.uService.navigate('pages/home');
  }

  onCloseModal(): void {
    this.uService.modalDimiss();
  }

  onEventInput(ev: any) {
    if(ev.length > 0) {
      this.activeMessage = true;
    } else {
      this.activeMessage = false;
    }
  }

  private async sendMessage(type_message: string, message: string) {
    const { _id }: any = await this.storage.getStorage('oUser');
    const payload: Payload = {
      message, owner: _id, date: new Date(),
      type_user: 0, type_message, view_message: false,
    };
    await this.chatFireService.sendMessage(payload, this.uid);
  }

  private getData(uid: string) {
    this.uid = uid;
    this.getMessage(uid);
    this.chatFireService.readMessages(uid)
      .subscribe(() => null);
    this.msService.getMaster(`services/${uid}`)
      .subscribe((res: any) => {
        console.log(res);
        this.service = res;
      });
  }

}

export interface Payload {
  message: string;
  owner: string;
  date: Date;
  type_user: number;
  type_message: string;
  view_message: boolean;
}
