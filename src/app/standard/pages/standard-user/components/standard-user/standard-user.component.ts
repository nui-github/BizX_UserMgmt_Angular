import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardUserListComponent } from '../standard-user-list/standard-user-list.component';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardUserDetailComponent } from '../standard-user-detail/standard-user-detail.component';
import { i18nUser } from '../../models/standard-user.model';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';
@Component({
  selector: 'app-standard-user',
  standalone: true,
  imports: [
    RouterModule,
    StandardUserListComponent,
    StandardUserDetailComponent,
    StandardCardComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-user.component.html',
  styleUrl: './standard-user.component.scss'
})
export class StandardUserComponent {
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
