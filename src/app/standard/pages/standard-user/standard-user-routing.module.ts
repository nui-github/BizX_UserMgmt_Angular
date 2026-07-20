import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardUserComponent } from './components/standard-user/standard-user.component';

const routes: Routes = [
  {
    path: "",
    component: StandardUserComponent
  },
  {
    path: "add",
    component: StandardUserComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.user.add', state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardUserComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.user.edit', state: "edit",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardUserRoutingModule { }
