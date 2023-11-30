import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { MasterService } from '@core/services/master.service';
import { AuthService } from '@modules/users/services/auth.service';
import { StorageService } from '@core/services/storage.service';
import { UtilsService } from '@core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { PushService } from '@core/services/push.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, AfterViewInit {
  fs: Firestore = inject(Firestore);
  setting!: any;
  registerForm!: FormGroup;
  avatar: any;
  countries$!: Observable<any[]>;
  language!: number;
  idioma = [
    { name: 'Español', id: 'es' },
    { name: 'Ingles', id: 'en' },
    { name: 'Portugués', id: 'pt' },
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private push: PushService,
    private ms: MasterService,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.loadForm();
    this.getSetting();
    this.countries$ = this.ms.getMaster('tables/countries');
  }

  ngAfterViewInit() {
  }

  getSetting() {
    console.log(Capacitor.getPlatform());
    onSnapshot(doc(this.fs, 'setting', 'meka'), (res: any) => {
      const data = res.data();
      this.setting = Capacitor.getPlatform() === 'ios' ? data.ios : data.md;
    });

  }

  onSubmit = async () => {
    if(this.registerForm.invalid) { return; }
    const data = this.registerForm.value;
    if(!data.term || !data.lgpd) {
      await this.uService.alert({
        mode: 'ios',
        message: this.translate.instant('SIGN.ERROR_TERM_LGPD'),
        buttons: ['OK']
      });
      return;
    }
    await this.storage.setStorageValue('language', data.language);
    await this.uService.load({message: this.translate.instant('PROCESSING')});
    this.translate.use(data.language);
    this.auth.signUp(this.registerForm.value).subscribe(
      async () => {
        this.uService.loadDimiss();
        await this.setToast();
        await this.push.initPush();
      },
      async ({ error }) => {
        console.log('ERROR ', error.response.errorMessage);
        this.uService.loadDimiss();
        await this.uService.alert(
          {
            mode: 'ios',
            header: 'Error',
            message: error.response.errorMessage,
            buttons: ['OK']
          }
        );
    });
  };

  loadForm = () => {
    this.registerForm = this.fb.group({
      picture: [''],
      lgpd: [, Validators.required],
      term: [, Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      language: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      first_name: ['', [Validators.required, Validators.minLength(4)]],
    });
    if(this.setting && this.setting.phone) {
      // this.registerForm.get('phone').addValidators(Validators.required);
    }
  };

  onBack = () => this.uService.navigate('/user/signIn');

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 80, allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.avatar = image.dataUrl;
    const url = await this.auth.uploadAvatar(image.dataUrl);
    this.registerForm.get('picture')?.setValue(url);
    console.log(url);
  };

  // private getDataForm = async (data: any): Promise<void> => {
  //   await this.storage.setStorageValue('language', data.language);
  // };

  private constructImage = () => {
    this.registerForm.patchValue({
      picture: this.avatar ? this.avatar : null
    });
  };

  private setToast = async (): Promise<void> => {
    await this.uService.toast({
      message: this.translate.instant('SIGN.SIGNUP_SUCCESS'),
      position: 'top', duration: 1000
    });
    this.uService.navigate('/user/signIn');
  };
}
