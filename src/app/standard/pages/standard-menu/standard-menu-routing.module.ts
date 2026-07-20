import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardMenuComponent } from './components/standard-menu/standard-menu.component';

const routes: Routes = [
  {
    path: "",
    component: StandardMenuComponent
  },
  {
    path: "add",
    component: StandardMenuComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.menu.add', state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardMenuComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.menu.edit', state: "edit",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardMenuRoutingModule { }
