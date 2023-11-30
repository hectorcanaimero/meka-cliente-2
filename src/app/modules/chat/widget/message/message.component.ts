import { StorageService } from '@core/services/storage.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-msg',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
})
export class MessageChatComponent implements OnInit {
  @Input() type: string = 'service';
  @Input() item: any;
  language!: string;

  constructor(
    private storage: StorageService
  ) {}

  async ngOnInit() {
    const { language } = await this.storage.getStorage('oUser');
    this.language = language;
  }

}
