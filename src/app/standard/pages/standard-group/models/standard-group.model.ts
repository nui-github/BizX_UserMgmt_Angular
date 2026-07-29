import { AbstractControl, FormArray, FormControl, Validators } from "@angular/forms";

export class StandardGroup {
  public cpid: string| null = null;
  public companyName?: string| null = null;
  public gid?: string| null = null;
  public name: string| null = null;
  public createTime?: string| null = null;
  public isActive: boolean| null = null;
  public lastUpdateTime?: string| null = null;
  public limitUser: number| null = null;
  public approval: string | boolean | null = null;
  public approvalId: string | null = null;
  public grouprole: StandardGroupRole[] = [];
}

export class StandardGroupRole {
  public gid: string | null = null;
  public name: string | null = null;
  public roleId: string | null = null;
}

export class SearchGroup implements ISearchGroup {
  public cpid: string | null;
  public name: string | null;

  constructor(){
    this.cpid = null;
    this.name = null;
  }
}

export interface ISearchGroup {
  cpid: string | null;
  name: string | null;
}

export interface IGroup {
  gid?: string;
  cpid?: string;
  companyName?: string;
  name: string;
  limitUser: number;
  isActive?: boolean;
  createTime?: string;
  lastUpdateTime?: string;
  approval: boolean;
  approvalId: string;
}

export class StandardGroupForm {
  public cpid: FormControl<string | null>;
  public companyName: FormControl<string | null>;
  public gid: FormControl<string | null>;
  public name: FormControl<string | null>;
  public createTime: FormControl<string | null>;
  public isActive: FormControl<boolean | null>;
  public lastUpdateTime: FormControl<string | null>;
  public limitUser: FormControl<number | null>;
  public approval: FormControl<boolean | null>;
  public approvalId: FormControl<string | null>;
  public grouprole: StandardGroupRole[] = [];
  constructor(){
    this.cpid = new FormControl(null, Validators.required);
    this.name = new FormControl(null, Validators.required);
    this.approval = new FormControl(null, Validators.required);
    this.limitUser = new FormControl(null, Validators.required);
    this.approvalId = new FormControl(null, Validators.required);
    this.companyName = new FormControl(null);
    this.gid = new FormControl(null);
    this.createTime = new FormControl(null);
    this.lastUpdateTime = new FormControl(null);
    this.isActive = new FormControl(null);
  }
}

export class StandardGroupCreateForm {
  public cpid: FormControl<string | null>;
  public companyName: FormControl<string | null>;
  public gid: FormControl<string | null>;
  public name: FormControl<string | null>;
  public createTime: FormControl<string | null>;
  public isActive: FormControl<boolean | null>;
  public lastUpdateTime: FormControl<string | null>;
  public limitUser: FormControl<number | null>;
  public approval: FormControl<string | boolean | null>;
  public approvalId: FormControl<string | null>;
  constructor(){
    this.cpid = new FormControl(null, Validators.required);
    this.name = new FormControl(null, Validators.required);
    this.approval = new FormControl(null, Validators.required);
    this.limitUser = new FormControl(null, Validators.required);
    this.approvalId = new FormControl(null, Validators.required);
    this.companyName = new FormControl(null);
    this.gid = new FormControl(null);
    this.createTime = new FormControl(null);
    this.lastUpdateTime = new FormControl(null);
    this.isActive = new FormControl(null);
  }
}

export class IGroupRoleMenu {
  public roleId: number[] = [];
}

export class GroupRoleMenu {
  public createTime?: string | null = null;
  public icon?: string | null = null;
  public id?: string | null = null;
  public isSubMenu?: boolean | null = null;
  public lastUpdateTime?: string | null = null;
  public name?: string | null = null;
  public order?: number | null = null;
  public parentMenuId?: number | null = null;
  public url?: string | null = null;
}

export class IStandardGroup {
  public cpid?: string;
  public companyName?: string;
  public gid?: string;
  public name?: string;
  public createTime?: string;
  public isActive?: boolean;
  public lastUpdateTime?: string;
  public limitUser?: number;
  public approval?: boolean;
  public approvalId?: string;
  public grouprole?: StandardGroupRole[];
}

export class IGroupRole {
  public gid: string | null = null;
  public name: string | null = null;
  public roleId: string | null = null;
}

export class GroupRole {
  id: string | null = null;
  gid?: string | null = null;
  roleId: string | null = null;
  createTime?: string | null = null;
  lastUpdateTime?: string | null = null;
}
