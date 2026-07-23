import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { IRole, Role, RoleCreateForm, RoleMenu, RoleMenuSearch, RolePerm, RolePermSearch } from '../../models/standard-role.model';
import { StandardRoleService } from '../../services/standard-role.service';
import { AlertService } from '../../../../core/services/alert.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { IMenu } from '../../../standard-menu/models/standard-menu.model';
import { StandardMenuService } from '../../../standard-menu/services/standard-menu.service';
import { StandardFilterPipe } from '../../../../filter/filter.pipe';
import { StandardPermissionService } from '../../../standard-permission/services/standard-permission.service';
import { StandardPermission, StandardPermissionSearch } from '../../../standard-permission/models/standard-permission.model';
import { forkJoin } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';
@Component({
  selector: 'app-standard-role-detail',
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
    StandardFilterPipe,
    TranslateModule
  ],
  templateUrl: './standard-role-detail.component.html',
  styleUrl: './standard-role-detail.component.scss'
})
export class StandardRoleDetailComponent extends StandardFormComponent<IRole>{
  public override pageTitle: string = this.i18n.role.pageTitle;
  public fetchDataService: StandardRoleService = inject(StandardRoleService);
  public formGroup: FormGroup<RoleCreateForm>;
  public formControl: RoleCreateForm = new RoleCreateForm();
  private searchPerm: StandardPermissionSearch = new StandardPermissionSearch();
  private searchRoleMenu: RoleMenuSearch = new RoleMenuSearch();
  private searchRolePerm: RolePermSearch = new RolePermSearch();
  public menuLabel:string = "pages.role.input.menu.label";
  public menuSubLabel:string = "pages.role.input.menu.sublabel";
  public permissionLabel:string = "pages.role.input.permission.label";
  public permissionSubLabel:string = "pages.role.input.permission.sublabel";
  public isLoadingMenu: boolean = false;
  public isLoadingPerm: boolean = false;

  public perms: any = [];
  public menus: IMenu[] = [];
  public rolePerms: any = [];
  public roleMenus: any = [];
  public role: any = {};

  public inputConfig: StandardFormCardInputConfig[] = [
    {
        id: "rmnc-role-name",
        name: "rmnc-role-name",
        formControlName: "name",
        label: "pages.role.input.name.label",
        sublabel: "pages.role.input.name.sublabel",
        type: 'text',
        showInput: true,
    },
  ]

  constructor(
    public permission: StandardAppPermissionService,
    // private alertService: AlertService,
    private menuService: StandardMenuService,
    private permService: StandardPermissionService,
  ){
    super();
    this.isCreated = true;
    this.formGroup = new FormGroup<RoleCreateForm>({
      ...this.formControl
    })
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['ROLE_CREATE'], this.APP_PERMISSION['ROLE_EDIT']]);
    if(!this.hasPermissions){
      this.formGroup.disable();
    }

    if(this.pageType === "add"){
      this.getPermissionList(this.searchPerm);
    }
  }


  override async ngOnInit(): Promise<void> {
    if (this.pageType === "add") {
      await this.getAllMenu();
    }
    super.ngOnInit();
  }


  override async fetchData() {
    this.searchRoleMenu.id = this.id ? +this.id : null;
    this.searchRolePerm.id = this.id;

    await this.getRole(this.id);
    await this.getAll(this.searchPerm, this.searchRoleMenu, this.searchRolePerm);
    await this.getAllMenu();
  }

  getAll(
    permSearch: StandardPermissionSearch,
    roleMenuSearch: RoleMenuSearch,
    rolePermSearch: RolePermSearch
  ) {
    return new Promise<any>((resolve) => {
      this.isLoading = this.isLoadingMenu = this.isLoadingPerm = true;

      let getPerm = this.permService.getPermissionList(
        1,
        9999,
        permSearch.permissionCode
      );
      let getRoleMenu = this.fetchDataService.getRoleMenu(roleMenuSearch);
      let getRolePerm = this.fetchDataService.getRolePermission(rolePermSearch);
      forkJoin({getPerm: getPerm , getRoleMenu: getRoleMenu, getRolePerm: getRolePerm}).subscribe({
        next: (res) => {
          this.isLoading = this.isLoadingMenu = this.isLoadingPerm = false;
          this.perms = (res['getPerm'] && res['getPerm'].data && res['getPerm'].data.data) || [];
          this.setPermission();
          this.checkPermissionSystemAdmin();
          this.roleMenus = (res['getRoleMenu'] && res['getRoleMenu'].data) || [];
          this.rolePerms = (res['getRolePerm'] && res['getRolePerm'].data) || [];

          // this.patchMenuValue(this.menus, this.roleMenus);
          this.patchPermissionValue(this.perms, this.rolePerms);
          resolve(null);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          resolve(null);
        }
      });
    });
  }

  getRole(roleId: string | null) {
    return new Promise<any>((resolve) => {
      this.isLoading = true;
      this.fetchDataService.getRoleById(roleId).subscribe({
        next: async (res) => {
          this.isLoading = false;
          this.role = res.data ? res.data : {};
          await this.patchFormControls(this.role);
          resolve(null);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          resolve(null);
        }
      });
    });
  }

  getAllMenu() {
    return new Promise<any>((resolve) => {
      this.isLoadingMenu = true;
      
      this.menuService.getMenuAll().subscribe({
        next: (res) => {
          this.isLoadingMenu = false;
          this.menus = res.data ? res.data : [];
          this.patchMenuValue(this.menus, this.roleMenus);
          resolve(null);
        },
        error: (err) => {
          this.isLoadingMenu = false;
          console.log(err);
          resolve(null);
        }
      });
    });
  }

  renderMenuName(id: number) {
    const menu = this.menus.find(p => p.id !== null && p.id == id.toString());
    return menu ? menu.name : "";
  }

  // parentMenuChecked(menu: FormGroup) {
  //   let submenu = <FormArray> menu.get('subMenu');
  //   if((!submenu || submenu.length == 0)) {
  //     const selected = menu.get('selected');
  //     return selected ? selected.value : null;
  //   }
  //   submenu.controls.map(p => p.get('selected')).some(function(p) {
  //     if (p != null &&  p.value) {
  //       const selected = menu.get('selected');
  //       return selected ? selected.value : null;
  //     }
  //   });
  //   return submenu.controls.map(p => p.get('selected')).some(p => {
  //     const value = p;
  //     return value ? p.value : null;
  //   });
  // }
  parentMenuChecked(menu: FormGroup): boolean {
    const submenu = menu.get('subMenu') as FormArray;
    if (!submenu || submenu.length === 0) {
      return menu.get('selected')?.value;
    }
    const subMenuSelected = submenu.controls
      .map(control => control.get('selected')?.value)
      .some(Boolean);
    if (subMenuSelected) {
      menu.get('selected')?.patchValue(true);
    } else {
      menu.get('selected')?.patchValue(false);
    }
    return subMenuSelected;
  }


  menuChecked(e: any, menu: FormGroup) {
    let checked = e.target && (<HTMLInputElement>e.target).checked || false;
    let submenu = <FormArray> menu.get('subMenu');
    if(submenu && submenu.length > 0) {
      submenu.controls.map(p => {
        const selected = p.get('selected');
        if(selected){
          selected.patchValue(checked);
        }
      });
    }
  }

  patchMenuValue(data: any[], mapper?: any[]) {
    this.formGroup.controls.menus.clear();
    let mainmenu = data.filter(p => !p.isSubMenu) || data.filter(p => p.isSubMenu);
    this.patchRecursionMenu(this.formGroup.controls.menus, mainmenu, data, mapper)
    this.formGroup.controls.menus.updateValueAndValidity();
  }

  patchRecursionMenu(menus: FormArray, mainmenu: any[], data: any[], mapper?: any[]) {
    mainmenu.forEach((m) => {
      let menu = {
        selected: new FormControl(false),
        parentMenuId: new FormControl(m.parentMenuId),
        id: new FormControl(m.id),
        subMenu: new FormArray<FormControl<number>>([])
      };
      if(this.pageType === "edit") {
        menu.selected.patchValue(mapper && mapper.some((roleMenu) => roleMenu.menuId == m.id) || false);
      }
      let submenu: any[] = data.filter(p => p.parentMenuId == m.id);
      if(submenu && submenu.length > 0) {
        this.patchRecursionMenu(menu.subMenu, submenu, data, mapper);
      }
      menus.push(new FormGroup({...menu}));
    });

  }

  get m() {
    return this.formGroup.controls.menus as FormArray;
  }

  eventOnChangePermission(data: any) {
    data.selected = !data.selected;
  }

  getPermissionList(permSearch: StandardPermissionSearch) {
    this.isLoadingPerm = true;
    this.permService
      .getPermissionList(1, 9999, permSearch.permissionCode)
      .subscribe({
        next: async (res) => {
          this.isLoadingPerm = false;
          this.perms =  res.data  && res.data.data !== undefined ? res.data.data : [];
          this.setPermission();
          await this.checkPermissionSystemAdmin();
          this.patchPermissionValue(this.perms);
        },
        error: (err) => {
          this.isLoadingPerm = false;
          console.log(err);
        }
      });
  }

  setPermission() {
    const count = this.perms == null ? 0 :this.perms.length;
    for (let i = 0; i < count; i++) {
      this.perms[i].selected = false;
    }
  }

  patchPermissionValue(data: any[], mapper?: any[]) {
    data.forEach((e) => this.formGroup.controls.perms.push(new FormControl(e)));
    if (mapper && this.pageType === "edit") {
      for (let m of mapper) {
        let permIdx: number = this.perms.findIndex(
          (perm: { id: any; }) => perm.id == m.permissionId
        );
        // this.formGroup.controls.perms.value[permIdx].selected = true;
        const permControl = this.formGroup.controls.perms.at(permIdx) as FormControl;
        const currentValue = permControl.value;
        if (currentValue) {
          currentValue.selected = true;
          permControl.patchValue(currentValue);
        }
        // this.formGroup.controls.perms.at(permIdx).patchValue(this.formGroup.controls.perms.value[permIdx]);
      }
    }
    this.formGroup.controls.perms.updateValueAndValidity();
  }

  checkPermissionSystemAdmin() {
    return new Promise<any>((resolve) => {
      const permission: any = StandardAppPermissionService.Permissions;
      if (!this.permissions.checkIsSystemAdmin()) {
        this.perms.forEach((item: { permissionCode: any; }, index: any, object: any[]) => {
          if (item.permissionCode === permission.SYS_ADMIN) {
            object.splice(index, 1);
          }
        });
      }
      resolve(null);
    });
  }

  save() {
    this.isSubmit = true;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    if (this.pageType === "add") {
      this.processCreateRole(this.formGroup.getRawValue());
    } else if (this.pageType === "edit") {
      this.processUpdateRole(this.formGroup.getRawValue());
    }
  }

  processCreateRole(fRoleValue: any) {
    this.isLoading = true;
    let role: Role = new Role();

    role.name = fRoleValue.name;
    role.rolemenu = this.getSelectMenu(fRoleValue.menus);
    // role.rolepermission = this.getSelectPerm(fRoleValue["fPermArrs"]);
    role.rolepermission = this.getSelectedPermission();

    this.fetchDataService.createRole(role).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.role.alertMessageCreateSuccess);
          super.onClosed();
        } else {
          this.alertService.alertDefaultError(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.alertService.alertDefaultError(this.i18n.role.alertMessageCreateFailure);
      }
    });
  }

  processUpdateRole(fRoleValue: any) {
    this.isLoading = true;
    let role: Role = new Role();

    role.id = this.id ? +this.id: null;
    role.name = fRoleValue.name;
    role.rolemenu = this.getSelectMenu(fRoleValue.menus);
    // role.rolepermission = this.getSelectPerm(fRoleValue["fPermArrs"]);
    role.rolepermission = this.getSelectedPermission();

    this.fetchDataService.updateRole(role).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.role.alertMessageUpdateSuccess);
          super.onClosed();
        } else {
          this.alertService.alertDefaultError(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.alertService.alertDefaultError(this.i18n.role.alertMessageUpdateFailure);
      }
    });
  }

  getSelectMenu(menu: any[]) {
    let menus: any[] = [];
    this.getSelectRecursionMenu(menus, menu);
    return menus;
  }

  getSelectRecursionMenu(selectedMenu: any[], menu:any[]) {
    menu.forEach((m) => {
      if(m.selected) {
        selectedMenu.push(
          new RoleMenu(m.id, this.id ? +this.id : null)
        );
      }
      if(m.subMenu && m.subMenu.length > 0) {
        this.getSelectRecursionMenu(selectedMenu, m.subMenu);
      }
    })
  }

  getSelectedPermission() {
    let perms: any[] = [];
    const count = this.perms == null ? 0 : this.perms.length;
    for (let i = 0; i < count; i++) {
      if (this.perms[i].selected) {
        perms.push(
          new RolePerm(
            this.perms[i].id,
            this.id ? +this.id : null
          )
        );
      }
    }
    return perms;
  }
}
