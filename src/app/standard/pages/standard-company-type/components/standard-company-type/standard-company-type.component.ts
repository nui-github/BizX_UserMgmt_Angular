import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StandardCompanyTypeListComponent } from '../standard-company-type-list/standard-company-type-list.component';
import { StandardCompanyTypeDetailComponent } from '../standard-company-type-detail/standard-company-type-detail.component';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-company-type',
  standalone: true,
  imports: [
    RouterModule,
    StandardCompanyTypeListComponent,
    StandardCompanyTypeDetailComponent,
    StandardCardComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-company-type.component.html',
  styleUrl: './standard-company-type.component.scss'
})
export class StandardCompanyTypeComponent {
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
