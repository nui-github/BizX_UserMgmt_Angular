import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardRegisterComponent } from './components/standard-register/standard-register.component';

const routes: Routes = [
  {
    path: "",
    component: StandardRegisterComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.register.add', state: "add",

    },
  },
  {
    path: "add",
    component: StandardRegisterComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.register.add', state: "edit",

    },
  },
  {
    path: "create",
    component: StandardRegisterComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.register.add', state: "add",

    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRegisterRoutingModule { }
