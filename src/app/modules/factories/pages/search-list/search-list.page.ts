import { FactoryService } from './../../services/factory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: 'search-list.page.html',
  styleUrls: ['search-list.page.scss'],
})
export class SearchListPage implements OnInit {

  constructor(
    private db: FactoryService
  ) {}

  ngOnInit() {
    this.db.getCompaniesLocation();
  }

}
