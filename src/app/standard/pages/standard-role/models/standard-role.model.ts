import { FormArray, FormControl, Validators } from "@angular/forms";

export class StandardRole {
}

export class Role {
  id: number | null = null;
  name: string | null = null;
  rolemenu: RoleMenu[] = [];
  rolepermission: RolePerm[] = [];
}

export interface IRole {
  id: number;
  name: string;
  company: string;
  createTime: string;
  lastUpdateTime: string;
}

export class RoleSearch {
  id: string | null;
  cpid: string | null;
  name: string | null;

  constructor() {
    this.id = null;
    this.cpid = null;
    this.name = "";
  }
}

export class RolePerm {
  permissionCode: string;
  roleId: number | null = null;

  constructor(perm: string = "", rid: number | null = null) {
    this.permissionCode = perm;
    this.roleId = rid;
  }
}

export class RoleMenu {
  menuId: number | null = null;
  roleId: number | null = null;

  constructor(mid: number | null = null, rid: number | null = null) {
    this.menuId = mid;
    this.roleId = rid;
  }
}

export class RoleCreateForm {
  public searchPermission: FormControl<string | null>;
  public name: FormControl<string | null>;
  public menus: FormArray<FormControl<boolean | null>>;
  public perms: FormArray<FormControl<boolean | null>>;
  public roleMenus: FormArray<FormControl<boolean | null>>;

  constructor(){
    this.name = new FormControl(null, Validators.required);
    this.searchPermission = new FormControl(null);
    this.menus = new FormArray<FormControl<boolean | null>>([]);
    this.perms = new FormArray<FormControl<boolean | null>>([]);
    this.roleMenus = new FormArray<FormControl<boolean | null>>([]);
  }
}

export class RoleMenuSearch {
  public roleId: number | null;
  public menuId: number | null;
  public id: number | null;

  constructor() {
    this.id = null;
    this.menuId = null;
    this.roleId = null;
  }
}

export class RolePermSearch {
  public id: string | null;

  constructor() {
    this.id = null;
  }
}

export interface IRoleMenu {
  id: number;
  roleId: number;
  menuId: number;
  createTime: string;
  lastUpdateTime: string;
}

export interface IRolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  createTime: string;
  lastUpdateTime: string;
}
