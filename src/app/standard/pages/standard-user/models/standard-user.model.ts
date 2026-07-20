import { FormControl, Validators } from "@angular/forms";
import { StandardAppValidators } from "../../../shared/validators/standard-app.validator";

export class StandardUser {
}

export class User {
  public cpid: string | null = null;
  public createTime: string | null = null;
  public email: string | null = null;
  public expire: string | null = null;
  public firstLogin: boolean | null = null;
  public firstName: string | null = null;
  public gid: string | null = null;
  public isActive: boolean | null = null;
  public lastConnectServerTime: string | null = null;
  public lastLoginTime: string | null = null;
  public lastName: string | null = null;
  public lastUpdateTime: string | null = null;
  public loginFail: number | null = null;
  public password: string | null = null;
  public passwordExpire: string | null = null;
  public telNumber: string | null = null;
  public ucode: string | null = null;
  public uid: string | null = null;
  public username: string | null = null;
  public employeecode: string | null = null;
  public department: string | null = null;
  public division: string | null = null;
}

export class SearchUser implements ISearchUser {
  public cpid: string | null = null;
  public email: string | null = null;
  public firstName: string | null = null;
  public gid: string | null = null;
  public lastName: string | null = null;
  public username: string | null = null;
}

export interface IUser {
  uid: string;
  company: string;
  cpid: string;
  email: string;
  firstName: string;
  gid: string;
  group: string;
  lastName: string;
  loginFail: number;
  telNumber: string;
  username: string;
  active: boolean;
  lock: boolean;
  approvalId: string;
  approve: boolean;
}

export interface ISearchUser {
  cpid: string | null;
  email: string | null;
  firstName: string | null;
  gid: string | null;
  lastName: string | null;
  username: string | null;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  group: string;
  gid: string;
  cpid: string;
  username: string;
  telNumber: string;
  loginFail: number;
}

export interface ICheckDuplicateUser {
  duplicate: boolean;
}

export class UserSearchForm{
  public cpid: FormControl<string | null>;
  public email: FormControl<string | null>;
  public firstName: FormControl<string | null>;
  public gid: FormControl<string | null>;
  public lastName: FormControl<string | null>;
  public username: FormControl<string | null>;

  constructor(){
    this.cpid = new FormControl(null);
    this.gid = new FormControl(null);
    this.username = new FormControl(null);
    this.email = new FormControl(null);
    this.firstName = new FormControl(null);
    this.lastName = new FormControl(null);
  }
}


export class StandardUserForm{
  public cpid: FormControl<string | null>;
  public email: FormControl<string | null>;
  public firstName: FormControl<string | null>;
  public gid: FormControl<string | null>;
  public lastName: FormControl<string | null>;
  public username: FormControl<string | null>;
  public telNumber: FormControl<string | null>;
  public password: FormControl<string | null>;
  public passwordConfirm: FormControl<string | null>;
  public createTime: FormControl<string | null>;
  public expire: FormControl<string | null>;
  public firstLogin: FormControl<boolean | null>;
  public isActive: FormControl<boolean | null>;
  public lastConnectServerTime: FormControl<string | null>;
  public lastLoginTime: FormControl<string | null>;
  public lastUpdateTime: FormControl<string | null>;
  public loginFail: FormControl<number | null>;
  public passwordExpire: FormControl<string | null>;
  public ucode: FormControl<string | null>;
  public uid: FormControl<string | null>;
  public employeecode: FormControl<string | null>;
  public department: FormControl<string | null>;
  public division: FormControl<string | null>;

  constructor(){
    this.cpid = new FormControl(null, Validators.required);
    this.gid = new FormControl(null, Validators.required);
    this.username = new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(StandardAppValidators.USERNAME),
    ]);
    this.email = new FormControl(null, [
      Validators.required,
      Validators.pattern(StandardAppValidators.EMAIL),
    ]);
    this.firstName = new FormControl(null, Validators.required);
    this.lastName = new FormControl(null, Validators.required);
    this.password = new FormControl(null, [
      Validators.required,
      // Validators.pattern(StandardAppValidators.PASSWORD),
    ]),
    this.passwordConfirm = new FormControl(null, Validators.required);
    this.telNumber = new FormControl(null,[Validators.pattern(StandardAppValidators.PHONE)]);
    this.createTime = new FormControl(null);
    this.expire = new FormControl(null);
    this.firstLogin = new FormControl(null);
    this.isActive = new FormControl(null);
    this.lastConnectServerTime = new FormControl(null);
    this.lastLoginTime = new FormControl(null);
    this.lastUpdateTime = new FormControl(null);
    this.loginFail = new FormControl(null);
    this.passwordExpire = new FormControl(null);
    this.ucode = new FormControl(null);
    this.uid = new FormControl(null);
    this.employeecode = new FormControl(null);
    this.department = new FormControl(null);
    this.division = new FormControl(null);
  }

}

export class i18nUser{
 public btnAdd: string = "components.button.add";
 public btnSearch: string = "components.button.search";
 public btnClear: string = "components.button.clear";
 public btnSave: string = "components.button.save";
 public btnBack: string = "components.button.back";
 public btnResetPassword: string = "components.button.resetpassword";
 public btnChangeStatus: string = "components.button.changestatus";
 public btnView: string = "components.button.view";
 public btnEdit: string = "components.button.edit";
 public btnApprove: string = "components.button.approve";
 public btnReject: string = "components.button.reject";

 public cardTitleName: string = "pages.user.list.card.name.title";
 public cardTitleUsername: string = "pages.user.list.card.username.title";
 public cardTitleApprove: string = "pages.user.list.card.approve.title";
 public cardTitleEmail: string = "pages.user.list.card.email.title";
 public cardTitleCompanyName: string = "pages.user.list.card.cpid.title";
 public cardTitleGroup: string = "pages.user.list.card.gid.title";
 public cardTitleStatus: string = "pages.user.list.card.status.title";

}
