import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardGroup, StandardGroupCreateForm } from '../../models/standard-group.model';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StandardGroupService } from '../../services/standard-group.service';
import { StandardConfGlobalService } from '../../../../core/services/standard-conf-global.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { StandardRegisterManagementService } from '../../../standard-register-management/services/standard-register-management.service';
import { SearchCompany, ICompany } from '../../../standard-company/models/standard-company.model';
import { RoleSearch, IRole } from '../../../standard-role/models/standard-role.model';
import { StandardRoleService } from '../../../standard-role/services/standard-role.service';
import { StandardUserService } from '../../../standard-user/services/standard-user.service';
import { IUser, SearchUser, IUserGroupRole, User } from '../../../standard-user/models/standard-user.model';
import { lastValueFrom } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
export interface ApproveOption {
  label: string | null;
  value: string | null;
}

export interface GroupMemberRow {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  addedAt?: string;
}

interface PendingGroupMember {
  uid: string;
  roleId: number;
  addedAt: string;
}

@Component({
  selector: 'app-standard-group-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzSelectModule,
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
  public userService: StandardUserService = inject(StandardUserService);
  public formGroup: FormGroup<StandardGroupCreateForm>;
  public formControl: StandardGroupCreateForm = new StandardGroupCreateForm();
  private searchCompany: SearchCompany = new SearchCompany();
  public responseItemsCompany: ICompany[] = [];
  public approvals: StandardGroup[] = [];
  ReadOnlyStyleGuideNotes:boolean =false;

  // Group Members — mock-only, see IUserGroupRole: assigns users to this group with a role,
  // stored on the user record (no tab_user_group_role table in the real schema).
  public allRoles: IRole[] = [];
  public allUsers: IUser[] = [];
  public groupMembers: GroupMemberRow[] = [];
  // Add mode: no gid exists yet, so assignments are held here and committed after create succeeds.
  public pendingMembers: PendingGroupMember[] = [];
  public memberEntryForm: FormGroup<{ uid: FormControl<string | null>; roleId: FormControl<number | null> }> = new FormGroup({
    uid: new FormControl<string | null>(null),
    roleId: new FormControl<number | null>(null),
  });
  public editingMemberIndex: number | null = null;
  public editRoleId: number | null = null;
  public groupMemberTitle: string = "pages.group.detail.memberRole.title";
  public groupMemberSubtitle: string = "pages.group.detail.memberRole.subtitle";

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
      // Company is locked in on edit for everyone — reassigning it after creation would ripple
      // into every user/role already scoped to this group's company.
      this.formGroup.controls.cpid.disable();
    }
    this.formGroup.controls.cpid?.valueChanges.subscribe((cpid) => {
      if(cpid){
        this.getApproveList(cpid);
        this.loadUsersForMembers(cpid);
      }
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
      }
    }
    this.roleService.getRoleList(1, 9999, new RoleSearch()).subscribe({
      next: (res) => {
        this.allRoles = (res && res.data && res.data.data) || [];
      },
      error: (err) => console.log(err)
    });
    super.ngOnInit();
  }

  override async fetchData(gid: string) {
    this.isLoading = true;
    const group$ = this.fetchDataService.getGroupById(gid);
    let res = await lastValueFrom(group$);
    this.isLoading = false;
    let group: StandardGroup = (res && res.data) || {} as StandardGroup;
    this.patchGroupDetailValue(group);
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
  changeUserLimit(checked: boolean) {
    this.formGroup.controls.limitUser.setValue(checked ? -1 : null);
  }

  save(): void | boolean {
    this.isSubmit = true;
    const limitUser: number | null = this.formGroup.controls.limitUser.value;

    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
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

  processCreateGroup(formValue: any) {
    this.isLoading = true;
    const createGroup: StandardGroup = {
      cpid: formValue.cpid,
      name: formValue.name,
      limitUser: formValue.limitUser,
      grouprole: [],
      isActive: true,
      approval: formValue.approval,
      approvalId: formValue.approvalId,
      companyName: null,
      gid: null,
      createTime: null,
      lastUpdateTime: null
    };

    this.fetchDataService.createGroup(createGroup).subscribe({
      next: async (res) => {
        if (res.status.toLowerCase() === "success") {
          const newGid = res.data?.gid;
          if (newGid) {
            await this.commitPendingMembers(newGid);
          }
          this.isLoading = false;
          this.alertService.alertDefaultSuccess(this.i18n.group.alertMessageCreateSuccess);
          super.onClosed();
        } else {
          this.isLoading = false;
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
    const updateGroup: StandardGroup = {
      cpid: formValue.cpid,
      name: formValue.name,
      limitUser: formValue.limitUser,
      gid: this.id,
      grouprole: [],
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

  // --- Group Members ---

  loadUsersForMembers(cpid: string | null) {
    const search = new SearchUser();
    search.cpid = cpid;
    this.userService.getUserList(1, 9999, search).subscribe({
      next: (res) => {
        this.allUsers = (res && res.data && res.data.data) || [];
        this.refreshMemberDisplay();
      },
      error: (err) => console.log(err)
    });
  }

  refreshMemberDisplay() {
    if (this.pageType === "add") {
      this.refreshPendingRows();
    } else {
      this.refreshMemberRows();
    }
  }

  refreshMemberRows() {
    const rows: GroupMemberRow[] = [];
    for (const user of this.allUsers) {
      for (const gr of user.groupRoles ?? []) {
        if (gr.gid === this.id) {
          rows.push({
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: gr.roleId,
            addedAt: gr.addedAt,
          });
        }
      }
    }
    this.groupMembers = rows;
  }

  refreshPendingRows() {
    const rows: GroupMemberRow[] = [];
    for (const pm of this.pendingMembers) {
      const user = this.allUsers.find(u => u.uid === pm.uid);
      if (!user) {
        continue;
      }
      rows.push({
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: pm.roleId,
        addedAt: pm.addedAt,
      });
    }
    this.groupMembers = rows;
  }

  roleName(roleId: number): string {
    return this.allRoles.find(r => r.id === roleId)?.name ?? String(roleId);
  }

  addMember() {
    const uid = this.memberEntryForm.controls.uid.value;
    const roleId = this.memberEntryForm.controls.roleId.value;
    if (!uid || !roleId) {
      this.memberEntryForm.markAllAsTouched();
      return;
    }
    const user = this.allUsers.find(u => u.uid === uid);
    if (!user) {
      return;
    }

    if (this.pageType === "add") {
      if (this.pendingMembers.some(pm => pm.uid === uid && pm.roleId === roleId)) {
        this.alertService.alertDefaultError('pages.group.detail.memberRole.duplicate.error');
        return;
      }
      this.pendingMembers = [...this.pendingMembers, { uid, roleId, addedAt: new Date().toISOString() }];
      this.refreshPendingRows();
      this.memberEntryForm.reset();
      return;
    }

    const existing = user.groupRoles ?? [];
    if (existing.some(gr => gr.gid === this.id && gr.roleId === roleId)) {
      this.alertService.alertDefaultError('pages.group.detail.memberRole.duplicate.error');
      return;
    }
    const updated: IUserGroupRole[] = [...existing, { gid: this.id as string, roleId, addedAt: new Date().toISOString() }];
    this.persistUserGroupRoles(user.uid, updated, () => this.memberEntryForm.reset());
  }

  removeMember(row: GroupMemberRow) {
    if (this.pageType === "add") {
      this.pendingMembers = this.pendingMembers.filter(pm => !(pm.uid === row.uid && pm.roleId === row.roleId));
      this.refreshPendingRows();
      return;
    }
    const user = this.allUsers.find(u => u.uid === row.uid);
    if (!user) {
      return;
    }
    const updated = (user.groupRoles ?? []).filter(gr => !(gr.gid === this.id && gr.roleId === row.roleId));
    this.persistUserGroupRoles(user.uid, updated);
  }

  startEditMember(index: number) {
    this.editingMemberIndex = index;
    this.editRoleId = this.groupMembers[index].roleId;
  }

  cancelEditMember() {
    this.editingMemberIndex = null;
    this.editRoleId = null;
  }

  saveEditMember(index: number) {
    const row = this.groupMembers[index];
    if (!this.editRoleId || this.editRoleId === row.roleId) {
      this.cancelEditMember();
      return;
    }
    const targetRoleId = this.editRoleId;

    if (this.pageType === "add") {
      if (this.pendingMembers.some(pm => pm.uid === row.uid && pm.roleId === targetRoleId)) {
        this.alertService.alertDefaultError('pages.group.detail.memberRole.duplicate.error');
        return;
      }
      this.pendingMembers = this.pendingMembers.map(pm => (pm.uid === row.uid && pm.roleId === row.roleId) ? { ...pm, roleId: targetRoleId } : pm);
      this.refreshPendingRows();
      this.cancelEditMember();
      return;
    }

    const user = this.allUsers.find(u => u.uid === row.uid);
    if (!user) {
      return;
    }
    const existing = user.groupRoles ?? [];
    if (existing.some(gr => gr.gid === this.id && gr.roleId === targetRoleId)) {
      this.alertService.alertDefaultError('pages.group.detail.memberRole.duplicate.error');
      return;
    }
    const updated = existing.map(gr => (gr.gid === this.id && gr.roleId === row.roleId) ? { ...gr, roleId: targetRoleId } : gr);
    this.persistUserGroupRoles(user.uid, updated, () => this.cancelEditMember());
  }

  private persistUserGroupRoles(uid: string, groupRoles: IUserGroupRole[], onSuccess?: () => void) {
    this.isLoading = true;
    this.userService.updateUser({ uid, groupRoles } as unknown as User).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadUsersForMembers(this.formGroup.controls.cpid.value);
        onSuccess?.();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  private async commitPendingMembers(gid: string) {
    for (const pm of this.pendingMembers) {
      const user = this.allUsers.find(u => u.uid === pm.uid);
      if (!user) {
        continue;
      }
      const updated: IUserGroupRole[] = [...(user.groupRoles ?? []), { gid, roleId: pm.roleId, addedAt: pm.addedAt }];
      await lastValueFrom(this.userService.updateUser({ uid: user.uid, groupRoles: updated } as unknown as User));
    }
  }

}
