import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardPermissionListComponent } from '../standard-permission-list/standard-permission-list.component';
import { StandardPermissionDetailComponent } from '../standard-permission-detail/standard-permission-detail.component';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';

@Component({
  selector: 'app-standard-permission',
  standalone: true,
  imports: [
    RouterModule,
    StandardPermissionListComponent,
    StandardPermissionDetailComponent,
    StandardCardComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-permission.component.html',
  styleUrl: './standard-permission.component.scss'
})
export class StandardPermissionComponent {
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
