import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { StandardCompanyListComponent } from '../standard-company-list/standard-company-list.component';
import { StandardCompanyDetailComponent } from '../standard-company-detail/standard-company-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-company',
  standalone: true,
  imports: [
    RouterModule,
    StandardCompanyListComponent,
    StandardCompanyDetailComponent,
    StandardCardComponent,
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-company.component.html',
  styleUrl: './standard-company.component.scss'
})
export class StandardCompanyComponent {
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
