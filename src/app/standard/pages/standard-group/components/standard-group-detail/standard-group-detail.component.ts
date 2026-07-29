import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { GroupRoleMenu, IGroupRole, IGroupRoleMenu, StandardGroup, StandardGroupCreateForm, StandardGroupForm } from '../../models/standard-group.model';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StandardGroupService } from '../../services/standard-group.service';
import { StandardConfGlobalService } from '../../../../core/services/standard-conf-global.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { StandardRegisterManagementService } from '../../../standard-register-management/services/standard-register-management.service';
import { SearchCompany, ICompany } from '../../../standard-company/models/standard-company.model';
import { RoleSearch } from '../../../standard-role/models/standard-role.model';
import { StandardRoleService } from '../../../standard-role/services/standard-role.service';
import { forkJoin, lastValueFrom, of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
export interface ApproveOption {
  label: string | null;
  value: string | null;
}

@Component({
  selector: 'app-standard-group-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    StandardFormCardComponent,
    StandardErrorMessageComponent,
    NzFormModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './standard-group-detail.component.html',
  styleUrl: './standard-group-detail.component.scss'
})
export class StandardGroupDetailComponent extends StandardFormComponent<StandardGroup>{
  public override pageTitle: string = this.i18n.group.pageTitle;
  public fetchDataService: StandardGroupService = inject(StandardGroupService);
  public standardTranslateService: StandardTranslateService = inject(StandardTranslateService);
  public formGroup: FormGroup<StandardGroupCreateForm>;
  public formControl: StandardGroupCreateForm = new StandardGroupCreateForm();
  private searchCompany: SearchCompany = new SearchCompany();
  public responseItemsCompany: ICompany[] = [];
  public approvals: StandardGroup[] = [];
  public roles: any[] = [];
  public roleMenus: any[] = [];
  public roleArrs: FormArray = new FormArray<FormControl<boolean | null>>([]);
  public groupRoles: any[] = [];
  private searchRole: RoleSearch = new RoleSearch();
  ReadOnlyStyleGuideNotes:boolean =false;
  public isSelected: boolean = false;
  public roleLabel: string = "pages.group.input.role.label";
  public menuLabel: string = "pages.group.input.menu.label";
  public roleNotFound: string = "pages.group.input.role.not.found";
  public roleNotFoundAdd: string = "pages.group.input.role.not.found.add";
  public roleNotFoundTag: string = "pages.group.input.role.not.found.tag";
  public roleNotFoundOf: string = "pages.group.input.role.not.found.of";
  public roleNotFoundCompany: string = "pages.group.input.role.not.found.company";

  public approveList:ApproveOption[] = [
    {
      label: "Yes",
      value: "true"
    },
    {
      label: "No",
      value: "false"
    }
  ]

  public inputCompanyConfig: StandardFormCardInputConfig[] = [
    {
      id: "umnc-company",
      name: "umnc-company",
      formControlName: "cpid",
      label: "pages.group.select.cpid.label",
      sublabel: "pages.group.select.cpid.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "",
    },
    {
      id: "user-search-keyword",
      name: "user-search-keyword",
      formControlName: "empty",
      label: "empty",
      sublabel: "empty",
      type: 'empty',
      showInput: false,
      placeholder: "",
    },
    {
        id: "gmnc-group-name",
        name: "gmnc-group-name",
        formControlName: "name",
        label: "pages.group.input.name.label",
        sublabel: "pages.group.input.name.sublabel",
        type: 'text',
        showInput: true,
        placeholder: "Please fill in",
    },
    {
      id: "gmnc-limit-user",
      name: "gmnc-limit-user",
      formControlName: "limitUser",
      label: "pages.group.input.limit.user.label",
      sublabel: "pages.group.input.limit.user.sublabel",
      type: 'checkboxInput',
      showInput: true,
      checkBoxLabel: "pages.group.checkbox.unlimited.users.label"
    },
    {
      id: "umnc-approve",
      name: "umnc-approve",
      formControlName: "approval",
      label: "pages.group.input.approve.label",
      sublabel: "pages.group.input.approve.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "",
    },
    {
      id: "umnc-approval-id",
      name: "umnc-approval-id",
      formControlName: "approvalId",
      label: "pages.group.input.group.approve.label",
      sublabel: "pages.group.input.group.approve.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "",
    }
  ]

  constructor(
    public permission: StandardAppPermissionService,
    private companyService:StandardCompanyService,
    private registerService: StandardRegisterManagementService,
    private confGlobalService: StandardConfGlobalService,
    private roleService: StandardRoleService,
  ){
    super();
    this.isCreated = true;
    this.formGroup = new FormGroup<StandardGroupCreateForm>({
      ...this.formControl
    });
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['GROUP_CREATE'], this.APP_PERMISSION['GROUP_EDIT']]);
    if(!this.hasPermissions){
      this.ReadOnlyStyleGuideNotes = true;
      this.formGroup.disable();
    }

    if (this.pageType === "edit") {
      this.formGroup.controls.name.disable();

    }
    this.formGroup.controls.cpid?.valueChanges.subscribe((cpid) => {
      if(cpid){
        this.getApproveList(cpid);
        this.searchRole.cpid = this.formGroup.controls.cpid.value;
        this.getRoleList(this.searchRole);
      }
      // this.eventOnCompanyChange();
    });
    this.inputCompanyConfig.filter(p => p.formControlName == "approval").map(map => {
      map.options = this.approveList.map(approve => this.mapApproveOptionToList(approve))
    })
    this.formGroup.controls.approval?.valueChanges.subscribe((approval) => {
      if(approval != null && approval == "false"){
        this.formGroup.controls.approvalId.reset("");
        this.formGroup.controls.approvalId.setValidators(null);
        this.formGroup.controls.approvalId.markAsTouched();
        this.formGroup.controls.approvalId.updateValueAndValidity();
        this.approvals = [];
      }else{
        this.formGroup.controls.approvalId.setValidators(Validators.required);
        this.formGroup.controls.approvalId.markAsTouched();
        this.formGroup.controls.approvalId.updateValueAndValidity();
      }
    });

    if (!this.permissions.checkIsSystemAdmin()) {
      // Company admin always creates/edits groups within their own company — lock it, add and edit alike.
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');
      this.formGroup.controls.cpid.setValue(currentUser.cpid ?? null);
      this.formGroup.controls.cpid.disable();
    }
  }

  override async ngOnInit(): Promise<void> {
    await this.getCompanyList(this.searchCompany);
    if (this.pageType == "add") {
      if (this.responseItemsCompany  && this.responseItemsCompany.length == 1 ){
        this.formGroup.controls.cpid.setValue(this.responseItemsCompany[0].cpid);
        this.searchRole.cpid = this.responseItemsCompany[0].cpid;
        this.getRoleList(this.searchRole);
      }
    }
    super.ngOnInit();
  }

  override async fetchData(gid: string) {
    this.isLoading = true;
    const group$ = this.fetchDataService.getGroupById(gid);
    let res = await lastValueFrom(group$);
    this.isLoading = false;
    let group: StandardGroup = (res && res.data) || {} as StandardGroup;
    this.patchGroupDetailValue(group);
    let searchRole = new RoleSearch();
    searchRole.cpid = group.cpid;
    searchRole.cpid = this.permissions.checkIsSystemAdmin() ? null : group.cpid;
    const listRole$ = this.roleService.getRoleList(1, 9999, searchRole);
    const listGroupRole$ = this.fetchDataService.getGroupRoleList(gid);
    const listApproval$ = group.approval ? this.fetchDataService.getApprovalList(group.cpid) : of([]);

    this.isLoading = true;



    forkJoin({listRole: listRole$ , listGroupRole: listGroupRole$, listApproval: listApproval$}).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.roles = (res && res['listRole'] && res['listRole'].data && res['listRole'].data.data) || [];
        this.groupRoles = (res && res['listGroupRole'] && res['listGroupRole'].data) || [];
        this.approvals = (res && res['listApproval'] && res['listApproval'].data) || [];
        this.patchRoleValue(this.roles);
        let roleIds: any[] = [];
        this.groupRoles.forEach(function (value) {
          roleIds.push(value.roleId);
        });
        this.getRoleMenus(roleIds);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  patchGroupDetailValue(data: StandardGroup) {
    data.approvalId = data.approvalId ?? "";
    data.approval = data.approval == true ? "true" : "false";
    this.formGroup.patchValue(data);
    this.formGroup.updateValueAndValidity();
  }


  getCompanyList(search: SearchCompany) {
    this.companyService
      .getListCompany(1, 999999, search)
      .subscribe({
        next: (res) => {
          this.responseItemsCompany = (res && res.data && res.data.data) || [];
          this.inputCompanyConfig.filter(e => e.formControlName == "cpid").map(map =>{
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

  getApproveList(cpid: string) {
    this.isLoading = true;
    this.fetchDataService.getApprovalList(cpid).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.approvals = (res && res.data) || [];
        const appove = this.approvals;
        this.inputCompanyConfig.filter(p => p.formControlName == "approvalId").map(map => {
          map.options = appove.map((group) => this.mapToGroupApprovalList(group))
        })
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
  mapToGroupApprovalList(item: StandardGroup) {
    return { value: item.gid != undefined ? item.gid: null, label: item.name };
  }
  getRoleList(searchRole: RoleSearch) {
    this.isLoading = true;
    this.roleService.getRoleList(1, 9999, searchRole).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.roles = (res && res.data && res.data.data) || [];
        if (this.roles.length == 0) {
          this.roleMenus = [];
        }
        this.patchRoleValue(this.roles);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  patchRoleValue(data: any[]) {
    this.formGroup.controls.roles.clear();
    data.forEach((role) => this.formGroup.controls.roles.push(new FormControl(false)));
    if (this.pageType === "edit") {
      for (let grole of this.groupRoles) {
        let roleIdx: number = this.roles.findIndex(
          (role) => role.id == grole.roleId
        );
        this.formGroup.controls.roles.at(roleIdx).patchValue(true);
      }
    }
    this.formGroup.updateValueAndValidity();
    this.eventOnChangeRole();
  }
  eventOnChangeRole() {
    let roleIds: any[] = [];
    this.formGroup.getRawValue().roles.filter((selected: any, i: number) => {
      if (selected) {
        roleIds.push(this.roles[i].id);
      }
    });

    this.getRoleMenus(roleIds);
  }
  getRoleMenus(data:any) {
    this.isLoading = true;
    let reqeust: IGroupRoleMenu = new IGroupRoleMenu();
    reqeust.roleId = data;
    this.fetchDataService.getRoleMenus(reqeust).subscribe({
      next: (res) => {
        this.isLoading = false;
        const menus = res.data ? res.data : []
        this.mappingMenu(menus);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  mappingMenu(datas: GroupRoleMenu[]) {
    this.roleMenus = [];
    let matchs: any[] = [];
    let notMatchs: GroupRoleMenu[] = [];
    datas.forEach((data) => {
      if (data.isSubMenu) {
        notMatchs.push(data);
      } else {
        matchs.push(data);
      }
    });
    notMatchs.forEach((notMatch) => {
      matchs.forEach((match) => {
        if (match.id == notMatch.parentMenuId){
          if (!match.subMenu || match.subMenu.length == 0)
            match.subMenu = [];
          match.subMenu.push(notMatch);
        }
      });
    });
    this.roleMenus = matchs;
  }

  changeUserLimit(checked: boolean) {
    this.formGroup.controls.limitUser.setValue(checked ? -1 : null);
  }

  get r() {
    return this.formGroup.controls.roles as FormArray;
  }

  changeRoles(checked: boolean, i:number) {
    this.r.at(i).setValue(checked ? -1 : null);
  }

  checkRoleSelected(role: any) {
    return role === true;
  }

  save(): void | boolean {
    this.isSubmit = true;
    const roles: any = this.formGroup.getRawValue().roles.filter(this.checkRoleSelected);
    if(roles.length === 0){
      this.isSelected = true;
    }
    const limitUser: number | null = this.formGroup.controls.limitUser.value;

    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || roles.length === 0) {
      return false;
    }
    if (limitUser != null && limitUser < -1) {
      this.alertService.alertDefaultError(this.i18n.alert.limitUserNotLessThanMinusOne);
      return;
    }
    if (this.pageType === "add") {
      this.processCreateGroup(this.formGroup.getRawValue());
    } else if (this.pageType === "edit") {
      this.processUpdateGroup(this.formGroup.getRawValue());
    }
  }
  checkRole(data: any){
    if (data.length === 0) {
      return false;
    }
    return true;
  }

  processCreateGroup(formValue: any) {
    this.isLoading = true;
    let roleSelected: IGroupRole[] = [];

    formValue.roles.filter((selected: any, i: number) => {
      if (selected) {
        roleSelected.push({
          gid: null,
          name: this.roles[i].name,
          roleId: this.roles[i].id,
        });
      }
    });
    const checked = this.checkRole(roleSelected);
    if (!checked) {
      this.isLoading = false;
      // Swal.fire("Warning", "Please select role.", "warning");
      // return;
    }

    const createGroup: StandardGroup = {
      cpid: formValue.cpid,
      name: formValue.name,
      limitUser: formValue.limitUser,
      grouprole: roleSelected,
      isActive: true,
      approval: formValue.approval,
      approvalId: formValue.approvalId,
      companyName: null,
      gid: null,
      createTime: null,
      lastUpdateTime: null
    };

    this.fetchDataService.createGroup(createGroup).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.group.alertMessageCreateSuccess);
          super.onClosed();
        } else {
          this.alertService.alertDefaultError(this.i18n.group.alertMessageCreateFailure);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.alertService.alertDefaultError(err.message);
        console.log(err);
      }
    });
  }

  processUpdateGroup(formValue: any) {
    this.isLoading = true;
    let roleSelected: any[] = [];
    formValue.roles.filter((selected: any, i: number) => {
      if (selected) {
        roleSelected.push({
          gid: this.id,
          name: this.roles[i].name,
          roleId: this.roles[i].id,
        });
      }
    });

    const checked = this.checkRole(roleSelected);
    if (!checked) {
      this.isLoading = false;
      // Swal.fire("Warning", "Please select role.", "warning");
      // return;
    }
    const updateGroup: StandardGroup = {
      cpid: formValue.cpid,
      name: formValue.name,
      limitUser: formValue.limitUser,
      gid: this.id,
      grouprole: roleSelected,
      approval: formValue.approval,
      approvalId: formValue.approvalId,
      isActive: null
    };

    this.fetchDataService.updateGroup(updateGroup).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.group.alertMessageUpdateSuccess);
          super.onClosed();
        } else {
          this.alertService.alertDefaultError(this.i18n.group.alertMessageUpdateFailure);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.alertService.alertDefaultError(err.message);
        console.log(err);
      }
    });
  }

  mapApproveOptionToList(item: ApproveOption){
    return {value: item.value, label: item.label};
  }

  getLang(){
    return this.standardTranslateService.getLang();
  }

}
