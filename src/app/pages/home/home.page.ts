import { Component, OnInit } from '@angular/core';
import { SocketService } from '@core/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  service: any;
  constructor(private sockerService: SocketService) {}
  ngOnInit(): void {
    this.sockerService.getData();
  }
}
