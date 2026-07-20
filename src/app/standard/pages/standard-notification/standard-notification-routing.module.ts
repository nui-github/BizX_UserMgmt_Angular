import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardNotificationListComponent } from './components/standard-notification-list/standard-notification-list.component';

const routes: Routes = [
  {
    path: "",
    component: StandardNotificationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardNotificationRoutingModule { }
