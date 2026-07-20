import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardRoleComponent } from './components/standard-role/standard-role.component';


const routes: Routes = [
  {
    path: "",
    component: StandardRoleComponent
  },
  {
    path: "add",
    component: StandardRoleComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.role.add', state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardRoleComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.role.edit', state: "edit",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoleRoutingModule { }
