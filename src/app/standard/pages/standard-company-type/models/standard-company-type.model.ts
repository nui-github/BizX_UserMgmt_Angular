import { FormArray, FormControl, Validators } from "@angular/forms";

export class StandardCompanyType {
  public id: string | null = null;
  public name: string | null = null;
  public registerType: number | null = null;
  public createTime: string | null = null;
  public lastUpdateTime: string | null = null;
}

export class ICompanyType {
  public id: string | null = null;
  public name: string | null = null;
  public registerType: number | null = null;
  public createTime: string | null = null;
  public lastUpdateTime: string | null = null;
}

export class CompanyType {
  public id: number | null = null;
  public name: string | null = null;
  public registerType: number | null = null;
  public companyTypeMenu: CompanyTypeMenu[] | null = [];
}


export class CompanyTypeMenu {
  menuId: number | null;
  companyTypeId: number | null;
  constructor(menuId: number | null = null, companyTypeId: number | null = null) {
    this.menuId = menuId;
    this.companyTypeId = companyTypeId;
  }
}

export class RegisterType {
  public id: number | null;
  public code: number | null;
  public nameEn: string | null;
  public nameTh: string | null;
  public active: number | null;

  constructor() {
    this.id = null;
    this.code = null;
    this.nameEn = null;
    this.nameTh = null;
    this.active = null;
  }
}

export class CompanyTypeSearch {
  public name: string | null;
  public registerType: string | null;

  constructor() {
    this.name = null;
    this.registerType = null;
  }
}

export class IMenu {
  private static DEFAULT_ISSUBMENU = false;

  public id: string | null = null;
  public isSubMenu: boolean | null = null;
  public menuId: number | null = null;
  public parentMenuId: string | null = null;
  public name: string | null = null;
  public order: number | null = null;
  public url: string | null = null;
  public icon: string | null = null;
  public createTime: string | null = null;
  public lastUpdateTime: string | null = null;
  public submenu: IMenu[] | null = null;

  constructor() {
    this.isSubMenu = IMenu.DEFAULT_ISSUBMENU;
  }
}

export class CompanyTypeForm {
  public companyTypeRegisterType!: FormControl<string | null>;
  public companyTypeName!: FormControl<string | null>;
  public menuArr: FormArray<FormControl<string | null>>;
  public companyTypeMenu: FormArray<FormControl<string | null>>;

  constructor() {
    this.companyTypeRegisterType = new FormControl(null, [Validators.required]);
    this.companyTypeName = new FormControl(null, [Validators.required]);
    this.menuArr = new FormArray<FormControl<string | null>>([]);
    this.companyTypeMenu = new FormArray<FormControl<string | null>>([]);
  }
}

export class CompanyTypeMenuSearch {
  public companyTypeId: number | null;
  constructor() {
    this.companyTypeId = null;
  }
}
