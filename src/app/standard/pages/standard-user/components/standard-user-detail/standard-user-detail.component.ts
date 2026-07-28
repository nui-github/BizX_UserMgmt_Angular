import { Component, inject } from '@angular/core';
import { IUser, IUserGroupRole, StandardUserForm } from '../../models/standard-user.model';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { StandardUserService } from '../../services/standard-user.service';
import { AbstractControlOptions, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { StandardGroupService } from '../../../standard-group/services/standard-group.service';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { ICompany, SearchCompany } from '../../../standard-company/models/standard-company.model';
import { SearchGroup, StandardGroup } from '../../../standard-group/models/standard-group.model';
import { StandardRoleService } from '../../../standard-role/services/standard-role.service';
import { IRole, RoleSearch } from '../../../standard-role/models/standard-role.model';
import { MustMatch } from '../../../../shared/validators/standard-mismatch.validator';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';

type GroupRoleEntryRow = FormGroup<{ gid: FormControl<string | null>; roleId: FormControl<number | null>; }>;

@Component({
  selector: 'app-standard-user-detail',
  standalone: true,
  imports: [
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzSelectModule,
    NzFormModule,
    ReactiveFormsModule,
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

  // "Add role for user" — see IUserGroupRole: mock-only, no tab_user_group_role table in the real schema.
  public allRoles: IRole[] = [];
  public assignedGroupRoles: IUserGroupRole[] = [];
  public entryRows: FormArray<GroupRoleEntryRow> = new FormArray<GroupRoleEntryRow>([]);
  public groupRoleTitle = "pages.user.detail.groupRole.title";
  public groupRoleSubtitle = "pages.user.detail.groupRole.subtitle";

  public inputConfig: StandardFormCardInputConfig[] = [
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
    private roleService: StandardRoleService,
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
    this.formGroup.controls.cpid?.valueChanges.subscribe(() => this.eventOnCompanyChange());
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id") || null;
    });

    this.addEntryRow();

    if (this.pageType === "add") {
      // Company is no longer picked here — new users belong to the creating admin's own company.
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');
      this.formGroup.controls.cpid.setValue(currentUser.cpid ?? null);
    } else {
      // Existing user already belongs to a company — show it, but it can't be reassigned here.
      this.inputConfig.unshift({
        id: "umnc-company",
        name: "umnc-company",
        formControlName: "cpid",
        label: "pages.user.detail.select.cpid.label",
        sublabel: "pages.user.detail.select.cpid.sublabel",
        type: 'select',
        showInput: true,
      });
      this.formGroup.controls.cpid.disable();
    }

    if(this.pageType == 'edit'){
      this.formControls.uid.setValue(this.id);
      this.formControls.password.setValue(this.maskUp);
      this.formControls.username.disable();
      this.formControls.password.disable();
      this.formControls.passwordConfirm.disable();
      this.formControls.username.clearValidators();
      this.formControls.password.clearValidators();
      this.formControls.passwordConfirm.clearValidators();
      this.formGroup.updateValueAndValidity();
      // Confirm Password (and its layout spacer) only makes sense when actually setting a password — drop both
      // entirely in edit mode instead of just hiding, otherwise the 2-column grid leaves blank gaps behind.
      // Password itself (masked, disabled) moves to the end so Name/Contact fields still pair up cleanly.
      const passwordEntry = this.inputConfig.find(p => p.formControlName === "password")!;
      this.inputConfig = this.inputConfig.filter(p => !["passwordConfirm", "empty", "password"].includes(p.formControlName));
      this.inputConfig.push(passwordEntry);
    }
  }

  override ngOnInit(): void {
    this.getCompanyList(this.searchCompany);
    this.roleService.getRoleList(1, 9999, new RoleSearch()).subscribe({
      next: (res) => {
        this.allRoles = (res && res.data && res.data.data) || [];
      },
      error: (err) => console.log(err)
    });
    super.ngOnInit();
    if (this.pageType == "add") {
      this.successMessage = this.i18n.user.alertMessageCreateSuccess;
      this.failureMessage = this.i18n.user.alertMessageCreateFailure;
    } else if (this.pageType == "edit") {
      this.successMessage = this.i18n.user.alertMessageUpdateSuccess;
      this.failureMessage = this.i18n.user.alertMessageUpdateFailure
    }
  }

  override fetchData(id: string | number | null | undefined): void {
    this.isLoading = true;
    this.fetchDataService.getById(id as string).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.model = res ? res.data : {} as IUser;
        this.patchFormControls(res.data);
        this.assignedGroupRoles = [...(res.data?.groupRoles ?? [])];
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
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
    this.groupService.getGroupList(1, 999999, search).subscribe({
      next: (res) => {
        this.responseItemsGroup = res.data && res.data.data ? res.data.data : [];
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

  addEntryRow() {
    this.entryRows.push(new FormGroup({
      gid: new FormControl<string | null>(null),
      roleId: new FormControl<number | null>(null),
    }));
  }

  removeEntryRow(index: number) {
    this.entryRows.removeAt(index);
  }

  addAssignment(index: number) {
    const row = this.entryRows.at(index);
    const gid = row.controls.gid.value;
    const roleId = row.controls.roleId.value;
    if (!gid || !roleId) {
      row.markAllAsTouched();
      return;
    }
    if (this.assignedGroupRoles.some(a => a.gid === gid && a.roleId === roleId)) {
      this.alertService.alertDefaultError('pages.user.detail.groupRole.duplicate.error');
      return;
    }
    this.assignedGroupRoles = [...this.assignedGroupRoles, { gid, roleId }];
    this.syncGroupRolesControl();
    this.entryRows.removeAt(index);
    if (this.entryRows.length === 0) {
      this.addEntryRow();
    }
  }

  removeAssignment(index: number) {
    this.assignedGroupRoles = this.assignedGroupRoles.filter((_, i) => i !== index);
    this.syncGroupRolesControl();
  }

  syncGroupRolesControl() {
    this.formGroup.controls.groupRoles.setValue([...this.assignedGroupRoles]);
    this.formGroup.controls.gid.setValue(this.assignedGroupRoles[0]?.gid ?? null);
  }

  groupName(gid: string): string {
    return this.responseItemsGroup.find(g => g.gid === gid)?.name ?? gid;
  }

  roleName(roleId: number): string {
    return this.allRoles.find(r => r.id === roleId)?.name ?? String(roleId);
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
