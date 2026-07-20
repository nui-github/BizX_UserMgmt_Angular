import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandardHomeRoutingModule } from './standard-home-routing.module';
import { ShareModule } from '../../shared/share.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShareModule,
    StandardHomeRoutingModule
  ]
})
export class StandardHomeModule { }
