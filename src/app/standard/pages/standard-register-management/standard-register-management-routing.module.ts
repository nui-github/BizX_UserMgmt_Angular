import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardRegisterManagementComponent } from './components/standard-register-management/standard-register-management.component';
import { StandardRegisterComponent } from '../standard-register/components/standard-register/standard-register.component';

const routes: Routes = [
  {
    path: "",
    component: StandardRegisterManagementComponent
  },
  {
    path: "add",
    component: StandardRegisterManagementComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.regsiter.approve.edit', state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardRegisterManagementComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.regsiter.approve.edit', state: "edit",
    },
  },
  {
    path: "view/:id",
    component: StandardRegisterManagementComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.regsiter.approve.edit', state: "edit",
    },
  },
  {
    path: "create",
    component: StandardRegisterComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.register.add', state: "edit",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRegisterManagementRoutingModule { }
