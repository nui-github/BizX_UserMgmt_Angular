import { Component, inject } from '@angular/core';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StandardRoleListComponent } from '../standard-role-list/standard-role-list.component';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardRoleDetailComponent } from '../standard-role-detail/standard-role-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-role',
  standalone: true,
  imports: [
    RouterModule,
    StandardRoleListComponent,
    StandardRoleDetailComponent,
    StandardCardComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-role.component.html',
  styleUrl: './standard-role.component.scss'
})
export class StandardRoleComponent {
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
