import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import * as moment from 'moment';

import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationTokenService {

  constructor(
    private ms: MasterService,
    private storage: StorageService,
  ) { }

  validate = async () => {
    const user = await this.storage.getStorage('userClient');
    if (user) {
      const decode: any = jwtDecode(user.access);
      const exp = moment().diff(moment.unix(decode.exp), 'hours');
      if (exp >= -1) { this.refreshToken(user); }
    }
  };

  refreshToken = (user: any) => {
    this.ms.postMaster('setting/token/refresh/', { refresh: user.refresh })
    .subscribe(async (res: any) => {
      user.access = res.access;
      await this.storage.removeStorage('userClient');
      await this.storage.setStorage('userClient', user);
    });
  };

}
