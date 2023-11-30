import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TraslationService {
  constructor(
    private storage: StorageService,
    private translate: TranslateService
    ) {
      this.translate.addLangs(['en', 'es', 'pt']);
      this.definedLang();
  }

  use = (lang: string) => this.translate.use(lang);

  getDefaultLang = () => this.translate.getDefaultLang();

  async definedLang() {
    const user = await this.storage.getStorage('oUser');
    if (user) {
      this.translate.use(user.language);
    }
  }
}
