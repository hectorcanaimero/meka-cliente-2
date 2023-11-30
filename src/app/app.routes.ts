import { AuthGuard } from '@modules/users/services/auth.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages', canActivate: [AuthGuard],
    loadChildren: () => import('src/app/pages/pages.module')
      .then( m => m.PagesPageModule),
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/modules/users/users.module')
      .then( m => m.UsersModule),
  },
  {
    path: 'splash',
    loadChildren: () => import('@core/widgets/splash/splash.module')
      .then( m => m.SplashModule),
  },
  { path: 'service-open', canActivate: [AuthGuard],
    loadChildren: () => import('@modules/categories/pages/company/company.module')
      .then(m => m.CompanyModule) },

  { path: 'in-progress',  canActivate: [AuthGuard],
    loadChildren: () => import('@modules/categories/pages/waiting/waiting.module')
      .then( m => m.WaitingModule) },

    { path: 'comments',
    loadChildren: () => import('@modules/rate/pages/rating-modal/rating-modal.module')
      .then( m => m.RatingModalModule) },

    { path: 'service-rate',
    loadChildren: () => import('@modules/rate/pages/rating-modal/rating-modal.module')
      .then( m => m.RatingModalModule) },

  //TODO: Ruta de los diferentes Chat
  { path: 'chat', loadChildren: () => import('@modules/chat/chat.module')
    .then(m => m.ChatModule) },

  { path: 'search', loadChildren: () => import('@modules/factories/factories.module')
    .then(m => m.FactoriesModule) },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
];

export const appRoute = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
