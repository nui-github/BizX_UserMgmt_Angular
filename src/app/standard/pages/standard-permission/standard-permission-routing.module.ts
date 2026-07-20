import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardPermissionComponent } from './components/standard-permission/standard-permission.component';

const routes: Routes = [
  {
    path: "",
    component: StandardPermissionComponent
  },
  {
    path: "add",
    component: StandardPermissionComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.permission.add', state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardPermissionComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.permission.edit', state: "edit",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardPermissionRoutingModule { }
