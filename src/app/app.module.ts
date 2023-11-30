import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { appRoute } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { AppService } from 'src/app/app.service';
import { FirebaseModule } from '@core/firebase.module';
import { CoreStoreModule } from '@store/core-store.module';
import { SideMenuWidgetModule } from '@core/widgets/side-menu-widget/side-menu-widget.module';

import { environment } from 'src/environments/environment';
import { LanguageModule } from '@core/language/language.module';
import { NetworkWidgetModule } from '@core/widgets/network/network.module';

const config: SocketIoConfig = { url: environment.api.url, options: {} };
@NgModule({
  declarations: [AppComponent],
  imports: [
    appRoute,
    CoreModule,
    BrowserModule,
    FirebaseModule,
    LanguageModule,
    CoreStoreModule,
    SideMenuWidgetModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    NetworkWidgetModule,
  ],
  providers: [
    AppService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'googleTagManagerId', useValue: 'GTM-KTGSRRW' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
