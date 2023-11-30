import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(
    private ms: MasterService
  ) { }

  getCompaniesLocation = () => { };
}
