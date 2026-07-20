import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { StandardRegisterManagementListComponent } from '../standard-register-management-list/standard-register-management-list.component';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardRegisterManagementDetailComponent } from '../standard-register-management-detail/standard-register-management-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';
import { StandardRegisterDetailComponent } from '../../../standard-register/components/standard-register-detail/standard-register-detail.component';


@Component({
  selector: 'app-standard-register-management',
  standalone: true,
  imports: [
    RouterModule,
    StandardRegisterManagementListComponent,
    StandardRegisterManagementDetailComponent,
    StandardCardComponent,
    StandardRegisterDetailComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-register-management.component.html',
  styleUrl: './standard-register-management.component.scss'
})
export class StandardRegisterManagementComponent {
  public pageType: string = "";
  public readonly APP_PERMISSION: { [key: string]: string; } = StandardAppPermissionService.Permissions;
  public permissions: StandardAppPermissionService = inject(StandardAppPermissionService);
  public i18n: i18n = new i18n();

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(data => {
      this.pageType = data['state'];
    });
  }
}
