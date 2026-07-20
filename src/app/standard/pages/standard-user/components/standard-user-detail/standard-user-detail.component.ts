import { Component, inject } from '@angular/core';
import { IUser,StandardUserForm } from '../../models/standard-user.model';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { StandardUserService } from '../../services/standard-user.service';
import { AbstractControlOptions, FormGroup } from '@angular/forms';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StandardGroupService } from '../../../standard-group/services/standard-group.service';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { ICompany, SearchCompany } from '../../../standard-company/models/standard-company.model';
import { SearchGroup, StandardGroup } from '../../../standard-group/models/standard-group.model';
import { MustMatch } from '../../../../shared/validators/standard-mismatch.validator';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';
@Component({
  selector: 'app-standard-user-detail',
  standalone: true,
  imports: [
    NzGridModule,
    NzCardModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-user-detail.component.html',
  styleUrl: './standard-user-detail.component.scss'
})
export class StandardUserDetailComponent extends StandardFormComponent<IUser> {
  public override fetchDataService: StandardUserService = inject(StandardUserService);
  public override pageTitle: string = this.i18n.user.pageTitle;
  public userList: IUser[] = [];
  public responseItemsCompany: ICompany[] = [];
  public responseItemsGroup: StandardGroup[] = [];
  public formGroup: FormGroup<StandardUserForm>;
  private searchCompany: SearchCompany = new SearchCompany();
  private groupSearch: SearchGroup = new SearchGroup();
  public formControls: StandardUserForm = new StandardUserForm();
  private maskUp: string = "**********";
  public user: IUser | null = null;
  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "umnc-company",
      name: "umnc-company",
      formControlName: "cpid",
      label: "pages.user.detail.select.cpid.label",
      sublabel: "pages.user.detail.select.cpid.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "umnc-group",
      name: "umnc-group",
      formControlName: "gid",
      label: "pages.user.detail.select.gid.label",
      sublabel: "pages.user.detail.select.gid.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "umnc-username",
      name: "umnc-username",
      formControlName: "username",
      label: "pages.user.detail.input.username.label",
      sublabel: "pages.user.detail.input.username.sublabel",
      type: 'text',
      showInput: true,
      errorMessages:{
        'pattern': { message: "standard.validation.username.pattern"}
      }
    },
    {
      id: "umnc-password",
      name: "umnc-password",
      formControlName: "password",
      label: "pages.user.detail.input.password.label",
      sublabel: "pages.user.detail.input.password.sublabel",
      type: 'password',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.password.pattern"}
      }
    },
    {
      id: "empty",
      name: "empty",
      formControlName: "empty",
      label: "empty",
      sublabel: "empty",
      type: 'empty',
      showInput: false
    },
    {
      id: "umnc-confirm-password",
      name: "umnc-confirm-password",
      formControlName: "passwordConfirm",
      label: "pages.user.detail.input.passwordConfirm.label",
      sublabel: "pages.user.detail.input.passwordConfirm.sublabel",
      type: 'password',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.password.pattern"},
        'mustMatch': { message: "standard.validation.password.mustMatch"}
      }
    },
    {
      id: "umnc-firstname",
      name: "umnc-firstname",
      formControlName: "firstName",
      label: "pages.user.detail.input.firstName.label",
      sublabel: "pages.user.detail.input.firstName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "Please fill in"
    },
    {
      id: "umnc-lastname",
      name: "umnc-lastname",
      formControlName: "lastName",
      label: "pages.user.detail.input.lastName.label",
      sublabel: "pages.user.detail.input.lastName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "Please fill in"
    },
    {
      id: "umnc-phone",
      name: "umnc-phone",
      formControlName: "telNumber",
      label: "pages.user.detail.input.telNumber.label",
      sublabel: "pages.user.detail.input.telNumber.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.phone"},
      }
    },
    {
      id: "umnc-email",
      name: "umnc-email",
      formControlName: "email",
      label: "pages.user.detail.input.email.label",
      sublabel: "pages.user.detail.input.email.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.email.pattern"},
      }
    }
  ]


  constructor(
    public companyService:StandardCompanyService,
    public groupService:StandardGroupService,
    private route: ActivatedRoute,
  ) {
    super();
    this.isCreated = true;
    this.formGroup = new FormGroup<StandardUserForm>({
      ...this.formControls
    },
    {
      validators: MustMatch("password", "passwordConfirm"),

    } as AbstractControlOptions);
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['USER_CREATE'], this.APP_PERMISSION['USER_EDIT']]);
    this.formGroup.controls.cpid?.valueChanges.subscribe((company) => {

      if(!company){
        this.formGroup.controls.gid.setValue("");
      }
      this.eventOnCompanyChange();
    });
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id") || null;
    });
    if(this.pageType == 'edit'){
      this.eventOnCompanyChange();
      this.formControls.uid.setValue(this.id);
      this.formControls.password.setValue(this.maskUp);
      this.formControls.username.disable();
      this.formControls.password.disable();
      this.formControls.passwordConfirm.disable();
      this.formControls.username.clearValidators();
      this.formControls.password.clearValidators();
      this.formControls.passwordConfirm.clearValidators();
      this.formGroup.updateValueAndValidity();
      this.inputConfig.filter(p => p.formControlName == "passwordConfirm").map(map => {
        map.showInput =  false
      })
    }
  }

  override ngOnInit(): void {
    this.getCompanyList(this.searchCompany);
    super.ngOnInit();
    if (this.pageType == "add") {
      this.successMessage = this.i18n.user.alertMessageCreateSuccess;
      this.failureMessage = this.i18n.user.alertMessageCreateFailure;
    } else if (this.pageType == "edit") {
      this.successMessage = this.i18n.user.alertMessageUpdateSuccess;
      this.failureMessage = this.i18n.user.alertMessageUpdateFailure
    }
  }

  getCompanyList(search: SearchCompany) {
    this.companyService
      .getListCompany(1, 999999, search)
      .subscribe({
        next: (res) => {
          this.responseItemsCompany = (res && res.data && res.data.data) || [];
          this.inputConfig.filter(p => p.formControlName == "cpid").map(map => {
            map.options = this.responseItemsCompany.map(company => this.mapMenuToCompanyList(company))
          })
        },
        error: (err) => {
          console.log(err)
        }
      });
  }
  getGroupList(search: SearchGroup){
    this.groupService.getGroupList(1, 10, search).subscribe({
      next: (res) => {
        console.log(res);
        this.responseItemsGroup = res.data && res.data.data ? res.data.data : [];
        this.inputConfig.filter(p => p.formControlName == "gid").map(map => {
          map.options = this.responseItemsGroup.map(group => this.mapMenuToGroupList(group))
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  mapMenuToGroupList(item: StandardGroup) {
    return { value: item.gid != undefined ? item.gid : null, label: item.name };
  }

  mapMenuToCompanyList(item: ICompany) {
    return { value: item.cpid, label: item.name };
  }

  eventOnCompanyChange() {
    if (this.formGroup.controls.cpid.value) {
      this.groupSearch = new SearchGroup();
      this.groupSearch.cpid = this.formGroup.controls.cpid.value;
      this.getGroupList(this.groupSearch);
    }
  }
  save(){
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
    if(this.formGroup.invalid){
      return;
    }
    super.onSave();
  }
}
