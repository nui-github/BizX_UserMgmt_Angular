import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StandardAppValidators } from "../../../shared/validators/standard-app.validator";

export class StandardRegisterManagement {
}

export class RegisterType {
 public id: number | null = null;
 public code: number | null = null;
 public nameEn: string | null = null;
 public nameTh: string | null = null;
 public active: number | null = null;
}

export class SearchRegisterType {
 public code: number | null = null;
}

// export class Register {
//   id: string;
//   registerType: number;
//   companyTypeId: number;
//   companyTaxId: string;
//   companyName: string;
//   companyBranch: string;
//   houseNo: string;
//   moo: string;
//   building: string;
//   soi: string;
//   street: string;
//   districtCode: string;
//   districtName: string;
//   subDistrictCode: string;
//   subDistrictName: string;
//   provinceCode: string;
//   provinceName: string;
//   postCode: string;
//   companyPhone: string;
//   companyEmail: string;
//   contactName: string;
//   contactLastName: string;
//   contactPhone: string;
//   contactEmail: string;
//   firstName: string;
//   lastName: string;
//   userPhone: string;
//   userEmail: string;
//   username: string;
//   password: string;
//   status: number;
//   approveBy: string;
//   approveDate: string;
//   rejectReason: string;
//   createDate: string;
//   lastUpdate: string;

//   constructor(option?: any) {
//     this.id = (option && option.id) || null;
//     this.registerType = (option && option.registerType) || null;
//     this.companyTypeId = (option && option.companyTypeId) || null;
//     this.companyTaxId = (option && option.companyTaxId) || null;
//     this.companyName = (option && option.companyName) || null;
//     this.companyBranch = (option && option.companyBranch) || null;
//     this.houseNo = (option && option.houseNo) || null;
//     this.moo = (option && option.moo) || null;
//     this.building = (option && option.building) || null;
//     this.soi = (option && option.soi) || null;
//     this.street = (option && option.street) || null;
//     this.districtCode = (option && option.districtCode) || null;
//     this.districtName = (option && option.districtName) || null;
//     this.subDistrictCode = (option && option.subDistrictCode) || null;
//     this.subDistrictName = (option && option.subDistrictName) || null;
//     this.provinceCode = (option && option.provinceCode) || null;
//     this.provinceName = (option && option.provinceName) || null;
//     this.postCode = (option && option.postCode) || null;
//     this.companyPhone = (option && option.companyPhone) || null;
//     this.companyEmail = (option && option.companyEmail) || null;
//     this.contactName = (option && option.contactName) || null;
//     this.contactLastName = (option && option.contactLastName) || null;
//     this.contactPhone = (option && option.contactPhone) || null;
//     this.contactEmail = (option && option.contactEmail) || null;
//     this.firstName = (option && option.firstName) || null;
//     this.lastName = (option && option.lastName) || null;
//     this.userPhone = (option && option.userPhone) || null;
//     this.userEmail = (option && option.userEmail) || null;
//     this.username = (option && option.username) || null;
//     this.password = (option && option.password) || null;
//     this.status = (option && option.status) || null;
//     this.approveBy = (option && option.approveBy) || null;
//     this.approveDate = (option && option.approveDate) || null;
//     this.rejectReason = (option && option.rejectReason) || null;
//     this.createDate = (option && option.createDate) || null;
//     this.lastUpdate = (option && option.lastUpdate) || null;
//   }
// }


// export interface Register {
//   id: string;
//   registerType: number;
//   companyTypeId: number;
//   companyTaxId: string;
//   companyName: string;
//   companyBranch: string;
//   houseNo: string;
//   moo: string;
//   building: string;
//   soi: string;
//   street: string;
//   districtCode: string;
//   districtName: string;
//   subDistrictCode: string;
//   subDistrictName: string;
//   provinceCode: string;
//   provinceName: string;
//   postCode: string;
//   companyPhone: string;
//   companyEmail: string;
//   contactName: string;
//   contactLastName: string;
//   contactPhone: string;
//   contactEmail: string;
//   firstName: string;
//   lastName: string;
//   userPhone: string;
//   userEmail: string;
//   username: string;
//   password: string;
//   status: number;
//   approveBy: string;
//   approveDate: string;
//   rejectReason: string;
//   createDate: string;
//   lastUpdate: string;
// }



export class Register {
  id: string | null;
  registerType: number | null;
  companyTypeId: number | null;
  companyTaxId: string | null;
  companyName: string | null;
  companyBranch: string | null;
  houseNo: string | null;
  moo: string | null;
  building: string | null;
  soi: string | null;
  street: string | null;
  districtCode: string | null;
  districtName: string | null;
  subDistrictCode: string | null;
  subDistrictName: string | null;
  provinceCode: string | null;
  provinceName: string | null;
  postCode: string | null;
  companyPhone: string | null;
  companyEmail: string | null;
  contactName: string | null;
  contactLastName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  firstName: string | null;
  lastName: string | null;
  userPhone: string | null;
  userEmail: string | null;
  username: string | null;
  password: string | null;
  status: number | null;
  approveBy: string | null;
  approveDate: string | null;
  rejectReason: string | null;
  createDate: string | null;
  lastUpdate: string | null;
  passwordConfirm: string | null;
  constructor(option?: any) {
    this.id = (option && option.id) || null;
    this.registerType = (option && option.registerType) || null;
    this.companyTypeId = (option && option.companyTypeId) || null;
    this.companyTaxId = (option && option.companyTaxId) || null;
    this.companyName = (option && option.companyName) || null;
    this.companyBranch = (option && option.companyBranch) || null;
    this.houseNo = (option && option.houseNo) || null;
    this.moo = (option && option.moo) || null;
    this.building = (option && option.building) || null;
    this.soi = (option && option.soi) || null;
    this.street = (option && option.street) || null;
    this.districtCode = (option && option.districtCode) || null;
    this.districtName = (option && option.districtName) || null;
    this.subDistrictCode = (option && option.subDistrictCode) || null;
    this.subDistrictName = (option && option.subDistrictName) || null;
    this.provinceCode = (option && option.provinceCode) || null;
    this.provinceName = (option && option.provinceName) || null;
    this.postCode = (option && option.postCode) || null;
    this.companyPhone = (option && option.companyPhone) || null;
    this.companyEmail = (option && option.companyEmail) || null;
    this.contactName = (option && option.contactName) || null;
    this.contactLastName = (option && option.contactLastName) || null;
    this.contactPhone = (option && option.contactPhone) || null;
    this.contactEmail = (option && option.contactEmail) || null;
    this.firstName = (option && option.firstName) || null;
    this.lastName = (option && option.lastName) || null;
    this.userPhone = (option && option.userPhone) || null;
    this.userEmail = (option && option.userEmail) || null;
    this.username = (option && option.username) || null;
    this.password = (option && option.password) || null;
    this.status = (option && option.status) || null;
    this.approveBy = (option && option.approveBy) || null;
    this.approveDate = (option && option.approveDate) || null;
    this.rejectReason = (option && option.rejectReason) || null;
    this.createDate = (option && option.createDate) || null;
    this.lastUpdate = (option && option.lastUpdate) || null;
    this.passwordConfirm = (option && option.passwordConfirm) || null;

  }
  setValue(options?: Partial<RegisterForm>) {
    this.id = options && options.id?.value || null;
    this.registerType = options && options.registerType?.value || null;
    this.companyTypeId = options && options.companyTypeId?.value || null;
    this.companyTaxId = options && options.companyTaxId?.value || null;
    this.companyName = options && options.companyName?.value || null;
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
    this.firstName = options && options.firstName?.value || null;
    this.lastName = options && options.lastName?.value || null;
    this.userPhone = options && options.userPhone?.value || null;
    this.userEmail = options && options.userEmail?.value || null;
    this.username = options && options.username?.value || null;
    this.password = options && options.password?.value || null;
    this.status = options && options.status?.value || null;
    this.approveBy = options && options.approveBy?.value || null;
    this.approveDate = options && options.approveDate?.value || null;
    this.rejectReason = options && options.rejectReason?.value || null;
    this.createDate = options && options.createDate?.value || null;
    this.lastUpdate = options && options.lastUpdate?.value || null;
    this.passwordConfirm = options && options.passwordConfirm?.value || null;
  }
}

export class SearchRegister implements ISearchRegister {
  public registerType: number| null = null;
  public companyTaxId: string = "";
  public companyName: string = "";
  public companyBranch: string = "";
  public status: number | null = null;
  public createDateFrom: string | null = null;
  public createDateTo: string | null = null;
  public approveDateFrom: string | null = null;
  public approveDateTo: string | null = null;
}

export interface ISearchRegister {
  registerType: number | null;
  companyTaxId: string | null;
  companyName: string | null;
  companyBranch: string | null;
  status: number | null;
  createDateFrom: string | null;
  createDateTo: string | null;
  approveDateFrom: string | null;
  approveDateTo: string | null;
}

export class SearchRegisterAttachmentDocument implements ISearchRegisterAttachmentDocument {
  public registerId: string = "";
  public attachmentTypeId: number | null = null;
}

export interface ISearchRegisterAttachmentDocument {
  registerId: string;
  attachmentTypeId: number | null;
}

export class SearchRegisterAttachmentDocumentPayload implements ISearchRegisterAttachmentDocumentPayload {
  public id: string = "";
}

export interface ISearchRegisterAttachmentDocumentPayload {
  id: string;
}

export class ApproveRegister implements IApproveRegister {
  public id: string = "";
  public approve: boolean = false;
  public approveBy: string = "";
  public rejectReason: string = "";
}

export interface IApproveRegister {
  id: string;
  approve: boolean;
  approveBy: string;
  rejectReason: string;
}

export class SearchRegisterTypeAttachment implements ISearchRegisterTypeAttachment {
  public registerType: number | null = null;
}

export interface ISearchRegisterTypeAttachment {
  registerType: number | null;
}

export class RegisterSession {

  currentTab: number;
  registerData: Register | null;
  attachment: any[];
  registerAttachment: string;
  registerAttachmentId: number[];
  registerCheckVatCorporation: string;
  registerType: string;

  constructor(options: {
    currentTab?: number;
    registerData?: Register;
    attachment?: any[];
    registerAttachment?: string;
    registerAttachmentId?: number[];
    registerCheckVatCorporation?: string;
    registerType?: string;
  } = {}) {
    this.currentTab = options.currentTab || 0;
    this.registerData = options.registerData || null;
    this.attachment = options.attachment || [];
    this.registerAttachment = options.registerAttachment || '0';
    this.registerAttachmentId = options.registerAttachmentId || [];
    this.registerCheckVatCorporation = options.registerCheckVatCorporation || '0';
    this.registerType = options.registerCheckVatCorporation || '-1';
  }

}

export class CreateRegister {
  registerAttachmentId: number[];
  registerData: Register | null;

  constructor(options: {
    registerAttachmentId?: number[];
    registerData?: Register;

  } = {}) {
    this.registerAttachmentId = options.registerAttachmentId || [];
    this.registerData = options.registerData || null;
  }

}

export class CheckVatCorporation {
  companyTaxId: string | null = null;
}

export class RegisterAttachmentDocumentType {
  public id: number | null = null;
  public code: number | null = null;
  public nameEn: string | null = null;
  public nameTh: string | null = null;
  public sequence: number | null = null;
  public active: boolean | null = null;
  public registerType: number | null = null;
}

export class RegisterForm {
  public id: FormControl<string | null>;
  public registerType: FormControl<number | null>;
  public companyTypeId: FormControl<number | null>;
  public companyTaxId: FormControl<string | null>;
  public companyName: FormControl<string | null>;
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
  public firstName: FormControl<string | null>;
  public lastName: FormControl<string | null>;
  public userPhone: FormControl<string | null>;
  public userEmail: FormControl<string | null>;
  public username: FormControl<string | null>;
  public password: FormControl<string | null>;
  public status: FormControl<number | null>;
  public approveBy: FormControl<string | null>;
  public approveDate: FormControl<string | null>;
  public rejectReason: FormControl<string | null>;
  public createDate: FormControl<string | null>;
  public lastUpdate: FormControl<string | null>;
  public passwordConfirm: FormControl<string | null>;
  constructor() {
    this.id = new FormControl(null);
    this.registerType = new FormControl(null,[Validators.required]);
    this.companyTypeId =  new FormControl(null,[Validators.required]);
    this.companyTaxId =  new FormControl(null,[Validators.required, Validators.minLength(13),Validators.maxLength(13), Validators.pattern(StandardAppValidators.NUMBER_ONLY)]);
    this.companyName =  new FormControl(null,[Validators.required]);
    this.companyBranch =  new FormControl(null,[Validators.required]);
    this.houseNo =  new FormControl(null,[Validators.required]);
    this.moo =  new FormControl(null);
    this.building =  new FormControl(null);
    this.soi =  new FormControl(null);
    this.street =  new FormControl(null);
    this.districtCode =  new FormControl(null,[Validators.required]);
    this.districtName =  new FormControl(null,[Validators.required]);
    this.subDistrictCode =  new FormControl(null,[Validators.required]);
    this.subDistrictName =  new FormControl(null,[Validators.required]);
    this.provinceCode =  new FormControl(null,[Validators.required]);
    this.provinceName =  new FormControl(null,[Validators.required]);
    this.postCode =  new FormControl(null,[Validators.required]);
    this.companyPhone = new FormControl(null, [Validators.pattern(StandardAppValidators.PHONE)]);
    this.companyEmail = new FormControl(null, [Validators.required, Validators.pattern(StandardAppValidators.EMAIL)]);
    this.contactName =  new FormControl(null);
    this.contactLastName =  new FormControl(null);
    this.contactPhone = new FormControl(null, [Validators.pattern(StandardAppValidators.PHONE)]);
    this.contactEmail = new FormControl(null, [Validators.pattern(StandardAppValidators.EMAIL)]);
    this.firstName =  new FormControl(null,[Validators.required]);
    this.lastName =  new FormControl(null,[Validators.required]);
    this.userPhone =  new FormControl(null,[Validators.pattern(StandardAppValidators.PHONE)]);
    this.userEmail =  new FormControl(null, [
      Validators.required,
      Validators.pattern(StandardAppValidators.EMAIL),
    ]);
    this.username =   new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(StandardAppValidators.USERNAME),
    ]);
    this.password =  new FormControl(null, [
      Validators.required,
      Validators.pattern(StandardAppValidators.PASSWORD),
    ]),
    this.passwordConfirm = new FormControl(null, Validators.required);
    this.status =  new FormControl(null);
    this.approveBy =  new FormControl(null);
    this.approveDate =  new FormControl(null);
    this.rejectReason =  new FormControl(null);
    this.createDate =  new FormControl(null);
    this.lastUpdate =  new FormControl(null);
    this.districtName.disable();
    this.provinceName.disable();
  }

  //  function MapRegisterFormToRegister(input: FormGroup<RegisterForm>): Register{

  //   let result = new Register();
  //   result = input;
  // }
}


export class I18nRegisterManagement{
  public companyTypeLabel: string = "pages.regsiter.management.detail.information.select.companyTypeId.label";
  public companyTypeSubLabel: string = "pages.regsiter.management.detail.information.select.companyTypeId.sublabel";
  public personalTypeLabel: string = "pages.regsiter.management.detail.information.select.personalType.label";
  public personalTypeSubLabel: string = "pages.regsiter.management.detail.information.select.personalType.sublabel";
}
