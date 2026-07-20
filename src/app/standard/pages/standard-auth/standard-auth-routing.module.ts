import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardLoginComponent } from './components/standard-login/standard-login.component';
import { StandardChangePasswordComponent } from './components/standard-change-password/standard-change-password.component';
import { StandardForgotPasswordComponent } from './components/standard-forgot-password/standard-forgot-password.component';
import { StandardForgotPasswordChangeComponent } from './components/standard-forgot-password-change/standard-forgot-password-change.component';
import { StandardAuthComponent } from './components/standard-auth/standard-auth.component';

const routes: Routes = [
  { 
    path: "login", 
    component: StandardLoginComponent 
  },
  {
    path: "change",
    component: StandardChangePasswordComponent
  },
  {
    path: "forgotpassword",
    component: StandardForgotPasswordComponent
  },
  {
    path: "changepassword",
    component: StandardForgotPasswordChangeComponent
  },
  {
    path: "",
    component: StandardAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardAuthRoutingModule { }
