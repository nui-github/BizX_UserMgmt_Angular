import { Routes } from '@angular/router';
import { standardAuthCanActivateGuard } from './standard/core/guards/auth/standard-auth-can-activate.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./standard/pages/standard-auth/standard-auth.module').then(m => m.StandardAuthModule),
  },
   {
    path: "register",
    loadChildren: () => import('./standard/pages/standard-register/standard-register.module').then(m => m.StandardRegisterModule),
        data: {
          breadcrumbI18nKey: 'menu.breadcrumb.register'
        }
  },
  {
    path: 'mainmenu',
    loadChildren: () => import('./standard/pages/standard-mainmenu/standard-mainmenu.module').then(m => m.StandardMainmenuModule),
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.home'
    },
    canActivate: [standardAuthCanActivateGuard]
  },
  { path: "", pathMatch: "full", redirectTo: "auth/login" },
  { path: "**", redirectTo: "auth/login" },
];
