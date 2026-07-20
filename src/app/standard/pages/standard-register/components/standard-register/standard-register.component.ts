import { Component } from '@angular/core';
import { StandardRegisterDetailComponent } from '../standard-register-detail/standard-register-detail.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';

@Component({
  selector: 'app-standard-register',
  standalone: true,
  imports: [
    RouterModule,
    StandardRegisterDetailComponent,
    StandardCardComponent,
    NzIconModule
  ],
  templateUrl: './standard-register.component.html',
  styleUrl: './standard-register.component.scss'
})
export class StandardRegisterComponent {
  public pageType: string = "";
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(data => {
      this.pageType = data['state'];
    });
  }
}
