import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardMainmenuComponent } from './components/standard-mainmenu/standard-mainmenu.component';

const routes: Routes = [
  {
    path: "", component: StandardMainmenuComponent,
    children: [
      {
        path: "",
        redirectTo: "profile-setting",
        pathMatch: 'full'
      },
      {
        path: "permission",
        loadChildren: () => import('../standard-permission/standard-permission.module').then(m => m.StandardPermissionModule),
        data: {
          breadcrumbI18nKey: 'menu.breadcrumb.permission'
        }
      },
      {
        path: "menu",
        loadChildren: () => import('../standard-menu/standard-menu.module').then(m => m.StandardMenuModule),
        data: {
          breadcrumbI18nKey: 'menu.breadcrumb.menu'
        }
      },
      {
        path: "companytype",
        loadChildren: () => import('../standard-company-type/standard-company-type.module').then(m => m.StandardCompanyTypeModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.companytype'
        }
      },
      {
        path: "user",
        loadChildren: () => import('../standard-user/standard-user.module').then(m => m.StandardUserModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.user'
        }
      },
      {
        path: "company",
        loadChildren: () => import('../standard-company/standard-company.module').then(m => m.StandardCompanyModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.company'
        }
      },
      {
        path: "register/approve",
        loadChildren: () => import('../standard-register-management/standard-register-management.module').then(m => m.StandardRegisterManagementModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.regsiter.approve'
        }
      },
      {
        path: "register",
        loadChildren: () => import('../standard-register/standard-register.module').then(m => m.StandardRegisterModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.regsiter'
        }
      },
      {
        path: "group",
        loadChildren: () => import('../standard-group/standard-group.module').then(m => m.StandardGroupModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.group'
        }
      },
      {
        path: "role",
        loadChildren: () => import('../standard-role/standard-role.module').then(m => m.StandardRoleModule),
        data: {
           breadcrumbI18nKey: 'menu.breadcrumb.role'
        }
      },
      {
        path: "profile-setting",
        loadChildren: () => import('../standard-profile-setting/standard-profile-setting.module').then(m => m.StandardProfileSettingModule),

      },
      {
        path: "notification",
        loadChildren: () => import('../standard-notification/standard-notification.module').then(m => m.StandardNotificationModule),
        data: {
          breadcrumbI18nKey: 'menu.breadcrumb.notification'
       }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardMainmenuRoutingModule { }
