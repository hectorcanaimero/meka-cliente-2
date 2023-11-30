import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path: 'search-list', loadChildren: () => import('./pages/search-list/search-list.module').then( m => m.SearchListFactoriesModule) },
];

export const factoriesRoute = RouterModule.forChild(routes);
