import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StorageService } from '@core/services/storage.service';
import { ValidationTokenService } from '@core/services/validation-token.service';

@Injectable()
export default class ApiInterceptor implements HttpInterceptor {
  token: any;

  constructor(
    private storage: StorageService,
    private validationTokenService: ValidationTokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const promise = this.storage.getStorage('userClient');
    if (
    request.url.includes('services')  ||
    request.url.includes('user/add') ||
    request.url.includes('user/change-password') ||
    request.url.includes('master/countries') ||
    request.url.includes('user/password-code') ||
    request.url.includes('user/change-password-code/') ||
    request.url.includes('/assets/i18n/')) {
      return next.handle(request);
    }
    this.validationTokenService.validate();
    return from(promise).pipe(
      mergeMap((user: any) => {
        if (user) {
          const newClone = this.newToken(request, user.access);
          return next.handle(newClone);
        }
        return next.handle(request);
      })
    );
  }

  private newToken(request: HttpRequest<any>, token: any): any {
    if (token) {
      const clone: HttpRequest<any> = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
      return clone;
    }
  }
}
