import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StandardCompanyComponent } from "./components/standard-company/standard-company.component";
import { CompanyTemplateConfigPageComponent } from "./components/company-template-config-page/company-template-config-page.component";

const routes: Routes = [
  {
    path: "",
    component: StandardCompanyComponent,
  },
  {
    path: "add",
    component: StandardCompanyComponent,
    data: {
      breadcrumbI18nKey: "menu.breadcrumb.company.add",
      state: "add",
    },
  },
  {
    path: "edit/:id",
    component: StandardCompanyComponent,
    data: {
      breadcrumbI18nKey: "menu.breadcrumb.company.edit",
      state: "edit",
    },
  },
  {
    path: "template-config",
    component: CompanyTemplateConfigPageComponent,
    data: {
      breadcrumbI18nKey: "menu.breadcrumb.company.templateConfig",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandardCompanyRoutingModule {}
