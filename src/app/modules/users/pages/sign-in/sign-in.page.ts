import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '@core/services/utils.service';
import { StorageService } from '@core/services/storage.service';
import { AuthService } from '@modules/users/services/auth.service';
import { catchError, of } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  options = { initialSlide: 0, };
  active = true;
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AuthService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private storage: StorageService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) { return; }
    await this.uService.load({message: this.translate.instant('PROCESSING')});
    this.login(this.loginForm.value);
  }

  onSubmitForgotPassword = async () => {
    const form = this.forgotPasswordForm;
    if (form.invalid) { return; }
    await this.uService.load({message: this.translate.instant('PROCESSING')});
    this.db.forgotSenha(form.value).subscribe(
      async (res) => {
        this.uService.loadDimiss();
        await this.storage.setStorage('oChange', res);
        const opts: AlertOptions = {
          header: 'INFO',
          message: this.translate.instant('SIGN.MESSAGE_FORGOT'),
          buttons: [{
            text: 'Ok',
            handler: ()  => this.active = true
          }],
        };
        await this.uService.alert(opts);
      }
    );
  };

  loadForm = () => {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
    });
  };

  onRegister = () => this.uService.navigate('/user/signUp');

  login(data: any) {
    this.db.signIn(data)
    .pipe(catchError(async (error: any) => {
      this.uService.loadDimiss();
      await this.uService.alert({
        mode:'ios', header: 'Error', buttons: ['OK'],
        message: this.translate.instant(error.error.error_description || error.error.message),
      });
    }))
    .subscribe(async (res: any) => {
      this.uService.loadDimiss();
      if (res === null) {
        await this.uService.alert({
          mode:'ios', header: 'Error', buttons: ['OK'],
          message: this.translate.instant('USER_NOT_EXIST'),
        });
      } else if(res !== undefined) {
        this.translate.use(res?.user.language);
        await this.storage.setStorage('oAccess', res.access);
        await this.storage.setStorage('oUser', res.user);
        this.store.dispatch(actions.loadUser(res));
        this.uService.navigate('/pages/home');
      }
    });
  }
}
