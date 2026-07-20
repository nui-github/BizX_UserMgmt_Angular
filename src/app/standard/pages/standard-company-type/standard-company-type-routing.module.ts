import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardCompanyTypeComponent } from './components/standard-company-type/standard-company-type.component';

const routes: Routes = [
  {
    path: "",
    component: StandardCompanyTypeComponent
  },
  {
    path: "add",
    component: StandardCompanyTypeComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.companytype.add', state: "add",
    }
  },
  {
    path: "edit/:id",
    component: StandardCompanyTypeComponent,
    data: {
      breadcrumbI18nKey: 'menu.breadcrumb.companytype.edit', state: "edit",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardCompanyTypeRoutingModule { }
