import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardGroupComponent } from './components/standard-group/standard-group.component';

const routes: Routes = [
  {
    path: "",
    component: StandardGroupComponent
  },
  {
    path: "add",
    component: StandardGroupComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.group.add', state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardGroupComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.group.edit', state: "edit",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardGroupRoutingModule { }
