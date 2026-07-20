import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StandardPermission, StandardPermissionForm } from '../../models/standard-permission.model';
import { RouterModule } from '@angular/router';
import { StandardPermissionService } from '../../services/standard-permission.service';
import { CommonModule } from '@angular/common';
import { StandardInputComponent } from '../../../../shared/components/standard-input/standard-input.component';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { i18n } from '../../../../shared/models/standard-i18n.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-standard-permission-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    StandardInputComponent,
    StandardErrorMessageComponent,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-permission-detail.component.html',
  styleUrl: './standard-permission-detail.component.scss'
})
export class StandardPermissionDetailComponent extends StandardFormComponent<StandardPermission> {
  public override fetchDataService: StandardPermissionService = inject(StandardPermissionService);
  public override pageTitle: string = this.i18n.permission.pageTitle;

  public formGroup: FormGroup<StandardPermissionForm>;

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "perm-code",
      name: "perm-code",
      formControlName: "permissionCode",
      label: "pages.permission.input.permissionCode.label",
      sublabel: "pages.permission.input.permissionCode.sublabel",
      type: 'text',
      showInput: true
    }
  ]

  constructor() {
    super();

    this.formGroup = this.formService.createFormGroup(StandardPermissionForm);
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['PERMISSION_CREATE'], this.APP_PERMISSION['PERMISSION_EDIT']]);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.pageType == "add") {
      this.successMessage = this.i18n.permission.alertMessageCreateSuccess;
      this.failureMessage = this.i18n.permission.alertMessageCreateFailure;
    } else if (this.pageType == "edit") {
      this.successMessage = this.i18n.permission.alertMessageUpdateSuccess;
      this.failureMessage = this.i18n.permission.alertMessageUpdateFailure;
    }
  }

}
