import { FormControl, Validators } from "@angular/forms"
import { StandardAppValidators } from "../../../shared/validators/standard-app.validator";

export class StandardProfileSetting {
}


export interface IStandardProfileSettingForm {
  username: string;
  password: string;
  company: string;
  group: string;
  firstname: string;
  lastname: string;
   phone: string;
   email:string;
}

export class StandardProfileSettingForm{
  public company: FormControl<string | null>;
  public email: FormControl<string | null>;
  public firstname: FormControl<string | null>;
  public group: FormControl<string | null>;
  public lastname: FormControl<string | null>;
  public username: FormControl<string | null>;
  public phone: FormControl<string | null>;
  public password: FormControl<string | null>;

  constructor(){
    this.company = new FormControl(null);
    this.group = new FormControl(null);
    this.username = new FormControl(null);
    this.email = new FormControl(null, [
      Validators.required,
      Validators.pattern(StandardAppValidators.EMAIL),
    ]);
    this.firstname = new FormControl(null, Validators.required);
    this.lastname = new FormControl(null, Validators.required);
    this.password = new FormControl(null, [
      Validators.required,
      // Validators.pattern(StandardAppValidators.PASSWORD),
    ]),
    this.phone = new FormControl(null,[Validators.pattern(StandardAppValidators.PHONE)]);
  }

}
