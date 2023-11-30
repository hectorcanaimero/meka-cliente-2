import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/solicitud/solicitud.module').then( m => m.SolicitudCategoriesModule) },
];

export const categoriesRoute = RouterModule.forChild(routes);
