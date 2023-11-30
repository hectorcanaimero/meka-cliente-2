/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { StorageService } from '@core/services/storage.service';
import { TraslationService } from '@core/language/traslation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  @Input() user: any;
  setting: any;
  registerForm!: FormGroup;
  countries$!: Observable<any[]>;
  language!: number;
  idioma = [
    { name: 'Español', id: 'es' },
    { name: 'Ingles', id: 'en' },
    { name: 'Portugués', id: 'pt' },
  ];
  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
    private traslationService: TraslationService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loadForm();
    this.loadData();
    this.countries$ = this.ms.getMaster('tables/countries');
    this.ms.getMaster('setting')
    .subscribe((res: any) => this.setting = res.data);
  }


  async onSubmit(): Promise<void> {
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    await this.uService.load({message: this.translate.instant('PROCESSING')});
    this.processingData(this.user._id, data);
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', Validators.required],
      language: ['', Validators.required]
    });
    if(this.setting && this.setting.phone) {
      // this.registerForm.get('phone').addValidators(Validators.required);
    }
  };

  loadData = () => {
    if (this.user) {
      const res = this.user;
      this.registerForm.patchValue({
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        phone: res.phone,
        language: res.language
      });
    }
  };

  private processingData(id: string, data: any) {
    this.ms.patch2Master(`users/${id}`, data)
    .pipe(
      catchError(async (error: any) => {
        this.uService.loadDimiss();
        await this.uService.alert({
          header: 'Error',
          message: error.message,
          buttons:['OK']
        });
      })
    )
    .subscribe(async (user: any) => {
        console.log(user);
        this.uService.loadDimiss();
        this.store.dispatch(actions.loadUser(user));
        await this.storage.removeStorage('oUser');
        await this.storage.setStorage('oUser', user);
        this.traslationService.use(data.language);
        this.uService.navigate('/pages/home');
      },
    );
  }
}
