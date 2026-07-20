import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class StandardMenu {
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

export class Menu {
  public createTime: string | null = null;
  public icon: string | null = null;
  public id: string | null = null;
  public isSubMenu: boolean | null = null;
  public lastUpdateTime: string | null = null;
  public name: string | null = null;
  public order: number | null = null;
  public parentMenuId: number | null = null;
  public url: string | null = null;
}

export class MenuSearch {
  public gid: string | null;
  public name: string | null;
  public url: string | null;

  constructor() {
    this.gid = null;
    this.name = null;
    this.url = null;
  }
}

export class MenuCompanyType {
  public cpid: string | null;
  constructor() {
    this.cpid = null;
  }
}

export class StandardMenuSearchForm {
  public name!: FormControl<string | null>;
  public url!: FormControl<string | null>;

  constructor() {
    this.name = new FormControl(null);
    this.url = new FormControl(null);
  }
}

export class StandardMenuForm {
  public id!: FormControl<string | null>;
  public name!: FormControl<string | null>;
  public url!: FormControl<string | null>;
  public order!: FormControl<number | null>;
  public icon!: FormControl<string | null>;
  public parentMenuId!: FormControl<string | null>;
  public isSubMenu!: FormControl<boolean | null>;
  public createTime!: FormControl<string | null>;
  public lastUpdateTime!: FormControl<string | null>;

  constructor() {
    this.id = new FormControl(null)
    this.name = new FormControl(null, [Validators.required]);
    this.url = new FormControl(null, [requiredIfItIsSubmenu]);
    this.order = new FormControl(null, [Validators.required, Validators.min(1)]);
    this.icon = new FormControl(null);
    this.parentMenuId = new FormControl("", [requiredIfItIsSubmenu]);
    this.isSubMenu = new FormControl(false);
    this.createTime = new FormControl(null);
    this.lastUpdateTime = new FormControl(null);
  }
}

export const requiredIfItIsSubmenu: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if(control?.root?.get('isSubMenu')?.value) {
    return Validators.required(control);
  }
  return null;
}