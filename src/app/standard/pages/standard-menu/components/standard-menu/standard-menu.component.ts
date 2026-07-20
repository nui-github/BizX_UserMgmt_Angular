import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { StandardMenuListComponent } from '../standard-menu-list/standard-menu-list.component';
import { StandardMenuDetailComponent } from '../standard-menu-detail/standard-menu-detail.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-menu',
  standalone: true,
  imports: [
    RouterModule, 
    StandardCardComponent, 
    StandardMenuListComponent, 
    StandardMenuDetailComponent, 
    NzIconModule,
    TranslateModule
  ],
  templateUrl: './standard-menu.component.html',
  styleUrl: './standard-menu.component.scss'
})
export class StandardMenuComponent {

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
