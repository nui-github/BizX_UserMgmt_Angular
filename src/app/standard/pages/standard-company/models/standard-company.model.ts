import { FormControl, Validators } from "@angular/forms";
import { StandardAppValidators } from "../../../shared/validators/standard-app.validator";
export class StandardCompany {
}

export class ICompany {
  public name: string| null = null;
  public cpid: string| null = null;
  public companyTypeId: string| null = null;
  public limitUser: string| null = null;
  public limitTryPassword: string| null = null;
  public limitRepeatPassword: string| null = null;
  public isActive: boolean| null = null;
  public passwordExpireDays: string| null = null;
  public createTime: string| null = null;
  public lastUpdateTime: string| null = null;
  public idleSessionInSec: number| null = null;
  public limitSessionInSec: number| null = null;

  setValue(options?: ICompany_V2) {
    this.name = options && options.name || null;
    this.cpid = options && options.cpid || null;
    this.companyTypeId = options && options.companyTypeId || null;
    this.limitUser = options && options.limitUser || null;
    this.limitTryPassword = options && options.limitTryPassword || null;
    this.limitRepeatPassword = options && options.limitRepeatPassword || null;
    this.isActive = options && options.isActive ||  null;
    this.passwordExpireDays = options && options.passwordExpireDays || null;
    this.createTime = options && options.createTime || null;
    this.lastUpdateTime = options && options.lastUpdateTime || null;
    this.idleSessionInSec = options && options.idleSessionInSec ||  null;
    this.limitSessionInSec = options && options.limitSessionInSec ||  null;
  }

}

export class SearchCompany{
  public companyType: string | null;
  public name: string | null;

  constructor(){
    this.companyType = null;
    this.name = null;
  }
}

export class ICompany_V2 {
  public name: string| null = null;
  public cpid: string| null = null;
  public companyTypeId: string| null = null;
  public limitUser: string| null = null;
  public limitTryPassword: string| null = null;
  public limitRepeatPassword: string| null = null;
  public isActive: boolean| null = null;
  public passwordExpireDays: string| null = null;
  public createTime: string| null = null;
  public lastUpdateTime: string| null = null;
  public idleSessionInSec: number| null = null;
  public limitSessionInSec: number| null = null;
  public registerType: number| null = null;
  public companyTaxId: string| null = null;
  public companyBranch: string| null = null;
  public companyTypeName: string| null = null;
}

export class CompanySearchForm{
  public companyType: FormControl<string | null>;
  public name: FormControl<string | null>;

  constructor(){
    this.companyType = new FormControl(null);
    this.name = new FormControl(null);
  }
}

export class ICompanyInformation {
  public id: string | null = null;
  public cpid: string | null = null;
  public registerType: number | null = null;
  public companyTaxId: string | null = null;
  public companyBranch: string | null = null;
  public houseNo: string | null = null;
  public moo: string | null = null;
  public building: string | null = null;
  public soi: string | null = null;
  public street: string | null = null;
  public districtCode: string | null = null;
  public districtName: string | null = null;
  public subDistrictCode: string | null = null;
  public subDistrictName: string | null = null;
  public provinceCode: string | null = null;
  public provinceName: string | null = null;
  public postCode: string | null = null;
  public companyPhone: string | null = null;
  public companyEmail: string | null = null;
  public contactName: string | null = null;
  public contactLastName: string | null = null;
  public contactPhone: string | null = null;
  public contactEmail: string | null = null;

  setValue(options?: Partial<StandardCompaniesInformationForm>) {
    this.id = options && options.id?.value || null;
    this.cpid = options && options.cpid?.value || null;
    this.registerType = options && options.registerType?.value || null;
    this.companyTaxId = options && options.companyTaxId?.value || null;
    this.companyBranch = options && options.companyBranch?.value || null;
    this.houseNo = options && options.houseNo?.value || null;
    this.moo = options && options.moo?.value || null;
    this.building = options && options.building?.value || null;
    this.soi = options && options.soi?.value || null;
    this.street = options && options.street?.value || null;
    this.districtCode = options && options.districtCode?.value || null;
    this.districtName = options && options.districtName?.value || null;
    this.subDistrictCode = options && options.subDistrictCode?.value || null;
    this.subDistrictName = options && options.subDistrictName?.value || null;
    this.provinceCode = options && options.provinceCode?.value || null;
    this.provinceName = options && options.provinceName?.value || null;
    this.postCode = options && options.postCode?.value || null;
    this.companyPhone = options && options.companyPhone?.value || null;
    this.companyEmail = options && options.companyEmail?.value || null;
    this.contactName = options && options.contactName?.value || null;
    this.contactLastName = options && options.contactLastName?.value || null;
    this.contactPhone = options && options.contactPhone?.value || null;
    this.contactEmail = options && options.contactEmail?.value || null;
  }
}

export class StandardCompaniesInformationForm {
  public id: FormControl<string | null>;
  public cpid: FormControl<string | null>;
  public registerType: FormControl<number | null>;
  public companyTaxId: FormControl<string | null>;
  public companyBranch: FormControl<string | null>;
  public houseNo: FormControl<string | null>;
  public moo: FormControl<string | null>;
  public building: FormControl<string | null>;
  public soi: FormControl<string | null>;
  public street: FormControl<string | null>;
  public districtCode: FormControl<string | null>;
  public districtName: FormControl<string | null>;
  public subDistrictCode: FormControl<string | null>;
  public subDistrictName: FormControl<string | null>;
  public provinceCode: FormControl<string | null>;
  public provinceName: FormControl<string | null>;
  public postCode: FormControl<string | null>;
  public companyPhone: FormControl<string | null>;
  public companyEmail: FormControl<string | null>;
  public contactName: FormControl<string | null>;
  public contactLastName: FormControl<string | null>;
  public contactPhone: FormControl<string | null>;
  public contactEmail: FormControl<string | null>;

  constructor(){
    this.id = new FormControl(null);
    this.cpid = new FormControl(null);
    this.registerType = new FormControl(null);
    this.companyTaxId = new FormControl(null);
    this.companyBranch = new FormControl(null);
    this.houseNo = new FormControl(null);
    this.moo = new FormControl(null);
    this.building = new FormControl(null);
    this.soi = new FormControl(null);
    this.street = new FormControl(null);
    this.districtCode = new FormControl(null);
    this.districtName = new FormControl(null);
    this.subDistrictCode = new FormControl(null);
    this.subDistrictName = new FormControl(null);
    this.provinceCode = new FormControl(null);
    this.provinceName = new FormControl(null);
    this.postCode = new FormControl(null);
    this.companyPhone = new FormControl(null);
    this.companyEmail = new FormControl(null);
    this.contactName = new FormControl(null);
    this.contactLastName = new FormControl(null);
    this.contactPhone = new FormControl(null);
    this.contactEmail = new FormControl(null);
  }

}

export class StandardViewCompany {
  public header: ICompany;
  public detail: ICompanyInformation

  constructor(header:ICompany,detail:ICompanyInformation){
    this.header = header;
    this.detail = detail;
  }
}

export class StandardCompanyCreateForm{
  public name: FormControl<string | null>;
  public companyTypeId: FormControl<string | null>;
  public limitUser: FormControl<number | null>;
  public limitTryPassword: FormControl< number | null>;
  public limitRepeatPassword: FormControl< number | null>;
  public passwordExpireDays: FormControl< number | null>;
  public limitSessionInSec: FormControl< number | null>;
  public idleSessionInSec: FormControl< number | null>;
  public registerType: FormControl<number | null>;
  public companyTaxId: FormControl<string | null>;
  public companyBranch: FormControl<string | null>;
  public houseNo: FormControl<string | null>;
  public moo: FormControl<string | null>;
  public building: FormControl<string | null>;
  public soi: FormControl<string | null>;
  public street: FormControl<string | null>;
  public districtCode: FormControl<string | null>;
  public districtName: FormControl<string | null>;
  public subDistrictCode: FormControl<string | null>;
  public subDistrictName: FormControl<string | null>;
  public provinceCode: FormControl<string | null>;
  public provinceName: FormControl<string | null>;
  public postCode: FormControl<string | null>;
  public companyPhone: FormControl<string | null>;
  public companyEmail: FormControl<string | null>;
  public contactName: FormControl<string | null>;
  public contactLastName: FormControl<string | null>;
  public contactPhone: FormControl<string | null>;
  public contactEmail: FormControl<string | null>;

  constructor(){
    this.name = new FormControl(null, Validators.required);
    this.companyTypeId = new FormControl(null, Validators.required);
    this.limitUser = new FormControl(null, Validators.required);
    this.limitTryPassword = new FormControl(null, Validators.required);
    this.limitRepeatPassword = new FormControl(null, Validators.required);
    this.passwordExpireDays = new FormControl(null, Validators.required);
    this.limitSessionInSec = new FormControl(null, Validators.required);
    this.idleSessionInSec = new FormControl(null, Validators.required);
    this.registerType = new FormControl(null, Validators.required);
    this.companyTaxId = new FormControl(null, [Validators.required, Validators.minLength(13), Validators.pattern(StandardAppValidators.NUMBER_ONLY)]);
    this.companyBranch = new FormControl(null, Validators.required);
    this.houseNo = new FormControl(null, Validators.required);
    this.moo = new FormControl(null);
    this.building = new FormControl(null);
    this.soi = new FormControl(null);
    this.street = new FormControl(null);
    this.districtCode = new FormControl(null, Validators.required);
    this.districtName = new FormControl(null, Validators.required);
    this.subDistrictCode = new FormControl(null, Validators.required);
    this.subDistrictName = new FormControl(null, Validators.required);
    this.provinceCode = new FormControl(null, Validators.required);
    this.provinceName = new FormControl(null, Validators.required);
    this.postCode = new FormControl(null, Validators.required);
    this.companyPhone = new FormControl(null, [Validators.pattern(StandardAppValidators.PHONE)]);
    this.companyEmail = new FormControl(null, [Validators.required, Validators.pattern(StandardAppValidators.EMAIL)]);
    this.contactName = new FormControl(null);
    this.contactLastName = new FormControl(null);
    this.contactPhone = new FormControl(null, [Validators.pattern(StandardAppValidators.PHONE)]);
    this.contactEmail = new FormControl(null, [Validators.pattern(StandardAppValidators.EMAIL)]);
    this.districtName.disable();
    this.provinceName.disable();
  }
}

export interface ICompanyDuplicate {
  duplicate: boolean;
}

export class CheckVatCorporation {
  public companyTaxId: string | null = null;
}


export class I18nCompany{
  public streetLabel: string = "pages.company.detail.address.information.input.street.label";
  public streetSubLabel: string = "pages.company.detail.address.information.input.street.sublabel";
  public companyTaxIdLabel: string = "pages.company.detail.information.input.companyTaxId.label";
  public companyTaxIdSubLabel: string = "pages.company.detail.information.input.companyTaxId.sublabel";
  public personalTaxIdLabel: string = "pages.company.detail.information.input.personalTaxId.label";
  public personalTaxIdSubLabel: string = "pages.company.detail.information.input.personalTaxId.sublabel";
  public typeLabel: string = "pages.company.detail.information.select.type.label";
  public typeSubLabel: string = "pages.company.detail.information.select.type.sublabel";
  public companyTypeLabel: string = "pages.company.detail.information.select.companyTypeId.label";
  public companyTypeSubLabel: string = "pages.company.detail.information.select.companyTypeId.sublabel";
  public personalTypeLabel: string = "pages.company.detail.information.select.personalType.label";
  public personalTypeSubLabel: string = "pages.company.detail.information.select.personalType.sublabel";
  public companyNameLabel: string = "pages.company.detail.information.input.name.label";
  public companyNameSubLabel: string = "pages.company.detail.information.input.name.sublabel";
  public personalNameLabel: string = "pages.company.detail.information.input.personalName.label";
  public personalNameSubLabel: string = "pages.company.detail.information.input.personalName.sublabel";
}
