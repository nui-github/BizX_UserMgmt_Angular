import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardInputComponent } from '../../../../shared/components/standard-input/standard-input.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { StandardShowingPageComponent } from '../../../../shared/components/standard-showing-page/standard-showing-page.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { SearchUser, IUser, User, i18nUser } from '../../models/standard-user.model';
import { StandardUserService } from '../../services/standard-user.service';
import { ICompany, SearchCompany } from '../../../standard-company/models/standard-company.model';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { AlertService } from '../../../../core/services/alert.service';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';
export type UserSearchForm = {
   cpid: FormControl<string | null>;
   email: FormControl<string | null>;
   firstName: FormControl<string | null>;
   gid: FormControl<string | null>;
   lastName: FormControl<string | null>;
   username: FormControl<string | null>;
}

export interface Option {
  value: string | null;
  label: string | null;
}

@Component({
  selector: 'app-standard-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    StandardInputComponent,
    PaginationComponent,
    StandardShowingPageComponent,
    NzIconModule,
    NzFormModule,
    NzDropDownModule,
    NzSelectModule,
    NzFlexModule,
    NzListModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-user-list.component.html',
  styleUrl: './standard-user-list.component.scss'
})
export class StandardUserListComponent extends StandardTrackingComponent<SearchUser, IUser> {
  // override fetchData(): Promise<IPaginationResponse<IUser>> {
  //   throw new Error('Method not implemented.');
  // }

  public override fetchDataService: StandardUserService = inject(StandardUserService);
  public override pageTitle: string = this.i18n.user.pageTitle;
  public searchForm: FormGroup<UserSearchForm>;
  public override criteriaSearch: SearchUser = new SearchUser();
  public override responseItems: IUser[] | undefined;
  public override key: string = "uid";
  public override absoluteUrl: string;
  public responseItemsCompany: ICompany[] = [];
  public optionCompany: Option[] = [];
  private searchCompany: SearchCompany = new SearchCompany();
  // public i18n:i18nUser = new i18nUser();
  public  swalConfigs: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };
  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "umnl-search-cpid",
      name: "umnl-search-cpid",
      formControlName: "cpid",
      label: "pages.user.list.select.cpid.label",
      sublabel: "pages.user.list.select.cpid.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "Search Company Name...",
      options: this.optionCompany
    },
    {
      id: "umnl-search-username",
      name: "umnl-search-username",
      formControlName: "username",
      label: "pages.user.list.input.username.label",
      sublabel: "pages.user.list.input.username.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "umnl-search-email",
      name: "umnl-search-email",
      formControlName: "email",
      label: "pages.user.list.input.email.label",
      sublabel: "pages.user.list.input.email.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "umnl-search-firstName",
      name: "umnl-search-firstName",
      formControlName: "firstName",
      label: "pages.user.list.input.firstName.label",
      sublabel: "pages.user.list.input.firstName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "umnl-search-lastName",
      name: "umnl-search-lastName",
      formControlName: "lastName",
      label: "pages.user.list.input.lastName.label",
      sublabel: "pages.user.list.input.lastName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
  ]

  constructor(private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public permission: StandardAppPermissionService,
      public location: Location,
    public companyService:StandardCompanyService,
    private alertService: AlertService
  ) {
    super();
    this.absoluteUrl = this.location.path(true);

    this.searchForm = this.fb.group<UserSearchForm>({
      cpid: this.fb.control(null),
      email: this.fb.control(null),
      firstName: this.fb.control(null),
      gid: this.fb.control(null),
      lastName: this.fb.control(null),
      username: this.fb.control(null),
    })
  }
  override async ngOnInit(): Promise<void> {
    await this.getCompanyList(this.searchCompany);
    super.ngOnInit();
  }
  getCompanyList(search: SearchCompany) {
    this.companyService
      .getListCompany(1, 999999, search)
      .subscribe({
        next: (res) => {
          this.responseItemsCompany = (res && res.data && res.data.data) || [];
          this.inputConfig.filter(e => e.formControlName == "cpid").map(map =>{
            map.options = this.responseItemsCompany.map(company => this.mapToCompanyList(company))
          })
        },
        error: (err) => {
        }
      });
  }
  mapToCompanyList(item: ICompany) {
    return { value: item.cpid, label: item.name };
  }

  eventOnChangeUserStatus(user: IUser) {
    this.alertService.alertMessageOption(
      {
        title: super.translate(this.i18n.alert.titleWarning),
        text: user.approve ? super.translate(this.i18n.user.userChangeStatus) : super.translate(this.i18n.user.userApprove),
        type: "warning",
        ...this.swalConfigs}).then((result) => {
      if (result.value) {
        let userValue = new User();
        userValue.uid = user.uid;
        userValue.isActive = !Boolean(+user.active);
        userValue.cpid = user.cpid;
        this.fetchDataService.updateStatusUser(userValue).subscribe({
          next: (res) => {
            if (res && res.status.toLowerCase() === "success") {
              this.alertService.alertDefaultSuccess(this.i18n.user.userChangeStatusSuccess).then(
                (result) => {
                  this.eventOnSearch();
                }
              );
            } else if (res && res.status.toLowerCase() === "fail") {
              this.alertService.alertDefaultError(res.message);
            } else {
              this.alertService.alertDefaultError(this.i18n.user.userChangeStatusFailed);
            }
          },
          error: (err) => {
            console.log(err);
            this.alertService.alertDefaultError(this.i18n.user.userChangeStatusFailed);
          }
        });
      }
    });
  }

  eventOnResetPassword(user: IUser) {
    this.alertService.alertMessageOption(
      {
      title: super.translate(this.i18n.alert.titleWarning),
      text: super.translate(this.i18n.user.userResetPassword),
      type: "warning",
      ...this.swalConfigs}).then((result) => {
        console.log(result)
        if (result.value) {
            let userValue = new User();
            userValue.uid = user.uid;
            this.fetchDataService.resetPassword(userValue).subscribe({
              next: (res) => {
                if (res && res.status.toLowerCase() === "success") {
                  this.alertService.alertDefaultSuccess(this.i18n.user.userResetPasswordSuccess).then(
                    (result) => {
                      this.eventOnSearch();
                    }
                  );
                } else if (res && res.status.toLowerCase() === "fail") {
                  this.alertService.alertDefaultError(res.message);
                } else {
                  this.alertService.alertDefaultError(this.i18n.user.userResetPasswordFailed);
                }
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        });
  }
  checkPermissionApproval(approvalId: string) {
    let user = JSON.parse(sessionStorage.getItem('currentUser') ?? "{}");
    if(this.permission.checkIsSystemAdmin()) {
      return true;
    }

    return user['gid'] === approvalId;
  }
  eventUserUnlock(user: IUser) {
    this.alertService.alertMessageOption(
      {
      title: super.translate(this.i18n.alert.titleWarning),
      text: super.translate(this.i18n.user.userUnlock),
      type: "warning",
      ...this.swalConfigs}).then((result) => {
        console.log(result)
        if (result.value) {
            let userValue = new User();
            userValue.uid = user.uid;
            this.fetchDataService.unlockUser(userValue).subscribe({
              next: (res) => {
                if (res && res.status.toLowerCase() === "success") {
                  this.alertService.alertDefaultSuccess(this.i18n.user.userUnlockSuccess).then(
                    (result) => {
                      this.eventOnSearch();
                    }
                  );
                } else if (res && res.status.toLowerCase() === "fail") {
                  this.alertService.alertDefaultError(res.message);
                } else {
                  this.alertService.alertDefaultError(this.i18n.user.userUnlockFailed);
                }
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        });
  }
}
