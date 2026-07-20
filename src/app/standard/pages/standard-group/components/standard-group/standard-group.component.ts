import { Component, inject } from '@angular/core';
import { StandardGroupListComponent } from '../standard-group-list/standard-group-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardGroupDetailComponent } from '../standard-group-detail/standard-group-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-group',
  standalone: true,
  imports: [
    RouterModule,
    StandardGroupListComponent,
    StandardGroupDetailComponent,
    StandardCardComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-group.component.html',
  styleUrl: './standard-group.component.scss'
})
export class StandardGroupComponent {
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
