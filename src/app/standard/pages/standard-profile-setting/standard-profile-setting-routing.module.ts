import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardProfileSettingComponent } from './components/standard-profile-setting/standard-profile-setting.component';

const routes: Routes = [
  {
    path: "",
    component: StandardProfileSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardProfileSettingRoutingModule { }
