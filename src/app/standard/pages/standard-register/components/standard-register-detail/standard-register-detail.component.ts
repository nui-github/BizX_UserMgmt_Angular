import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardSubdistrictComponent } from '../../../standard-subdistrict/components/standard-subdistrict/standard-subdistrict.component';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { CheckVatCorporation, Register, RegisterAttachmentDocumentType, RegisterForm, RegisterSession, RegisterType, SearchRegisterType, SearchRegisterTypeAttachment } from '../../../standard-register-management/models/standard-register-management.model';
import { StandardRegisterManagementService } from '../../../standard-register-management/services/standard-register-management.service';
import { ICompanyType } from '../../../standard-company-type/models/standard-company-type.model';
import { StandardSearchSubDistrict, TypeaheadBase } from '../../../standard-subdistrict/models/standard-subdistrict.model';
import { StandardCompanyTypeService } from '../../../standard-company-type/services/standard-company-type.service';
import { StandardConfGlobalService } from '../../../../core/services/standard-conf-global.service';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from '../../../../shared/validators/standard-mismatch.validator';
import { StandardResponse } from '../../../../shared/models/standard-response.model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TranslateModule } from '@ngx-translate/core';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
@Component({
  selector: 'app-standard-register-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    StandardFormCardComponent,
    StandardSubdistrictComponent,
    StandardErrorMessageComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzStepsModule,
    NzDividerModule,
    TranslateModule,
  ],
  templateUrl: './standard-register-detail.component.html',
  styleUrl: './standard-register-detail.component.scss'
})
export class StandardRegisterDetailComponent extends StandardFormComponent<Register> {

  @Input() public override pageType!: string;
  public override pageTitle: string = this.i18n.registerDetail.pageTitle;
  public override fetchDataService: StandardRegisterManagementService = inject(StandardRegisterManagementService);
  public standardTranslateService:StandardTranslateService = inject(StandardTranslateService);
  public formGroup: FormGroup<RegisterForm>;
  public formControls: RegisterForm = new RegisterForm();
  fieldRegisterTypeName: string = "";
  public responseItemSubDistrict: StandardSearchSubDistrict[] = [];
  public responseItemsCompanyType: ICompanyType[] = [];
  public _registerType: RegisterType[] = [];
  public register!: Register;
  public document: RegisterAttachmentDocumentType[] = [];
  public attachForm: FormGroup;
  public configuration: any = {};
  public registerId: string | null = "";
  public currentRegisterSession: RegisterSession = new RegisterSession();
  public fileMap: Map<number, any> = new Map();
  public informationTitle = "";
  public addressTitle = "";
  public contactTitle = "";
  public policyTitle = "";
  private accessStep3: boolean = false;
  private allowFileSize: number = 10;
  current = 0;
  public progressAlignment: string = "horizontal";

  // public i18n: I18nRegister = new I18nRegister();
  index = 'Verification';
  public step = 1;
  loading = false;
  @ViewChild('onlyNumber') public onlyNumber!: TemplateRef<any>;
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'Verification';
        this.step = 1;
        break;
      }
      case 1: {
        this.index = `${this.fieldRegisterTypeName} Information`;
        this.step = 2;
        break;
      }
      case 2: {
        this.index = 'Upload Attachment';
        this.step = 3;
        break;
      }
      case 3: {
        this.index = 'User Information';
        this.step = 4;
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  // public district: any =
  // {
  //   label: "pages.regsiter.input.subtitle",
  //   sublabel: "ประเภท",
  // }
  public inputVerificationConfig: StandardFormCardInputConfig[] = [
    {
      id: "verify-register-type",
      name: "verify-register-type",
      formControlName: "registerType",
      label: "pages.regsiter.detail.information.select.registerType.label",
      sublabel: "pages.regsiter.detail.information.select.registerType.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "verify-company-tax",
      name: "verify-company-tax",
      formControlName: "companyTaxId",
      label: "pages.regsiter.detail.information.input.taxId.label",
      sublabel: "pages.regsiter.detail.information.input.taxId.sublabel",
      type: 'custom',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.number"},
        'minLength': {message: "standard.validation.tax.id.minlength"},
      }
    },
  ]

  public inputCompanyInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "reg-com-type",
      name: "reg-com-type",
      formControlName: "registerType",
      label: "pages.regsiter.detail.information.select.registerType.label",
      sublabel: "pages.regsiter.detail.information.select.registerType.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "reg-com-company-type",
      name: "reg-com-company-type",
      formControlName: "companyTypeId",
      label: "pages.regsiter.detail.information.select.type.label",
      sublabel: "pages.regsiter.detail.information.select.type.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "reg-com-company-tax-id",
      name: "reg-com-company-tax-id",
      formControlName: "companyTaxId",
      label: 'pages.regsiter.detail.information.input.taxId.label',
      sublabel: "pages.regsiter.detail.information.input.taxId.sublabel",
      type: 'text',
      showInput: true,errorMessages:{
        'pattern': { message: "standard.validation.tax.id.pattern"},
        'minLength': {message: "standard.validation.tax.id.minlength"},
      }

    },
    {
      id: "reg-com-company-name",
      name: "reg-com-company-name",
      formControlName: "companyName",
      label: 'pages.regsiter.detail.information.input.defaultCompanyName.label',
      sublabel: "pages.regsiter.detail.information.input.defaultCompanyName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "reg-com-company-branch",
      name: "reg-com-company-branch",
      formControlName: "companyBranch",
      label: 'pages.regsiter.detail.information.input.companyBranch.label',
      sublabel: "pages.regsiter.detail.information.input.companyBranch.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputPersonalInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "reg-com-type",
      name: "reg-com-type",
      formControlName: "registerType",
      label: "pages.regsiter.detail.information.select.registerType.label",
      sublabel: "pages.regsiter.detail.information.select.registerType.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "reg-com-company-tax-id",
      name: "reg-com-company-tax-id",
      formControlName: "companyTaxId",
      label: 'pages.regsiter.detail.information.input.personalTaxId.label',
      sublabel: "pages.regsiter.detail.information.input.personalTaxId.sublabel",
      type: 'text',
      showInput: true,errorMessages:{
        'pattern': { message: "standard.validation.tax.id.pattern"},
        'minLength': {message: "standard.validation.tax.id.minlength"}
      }
    },
    {
      id: "reg-com-company-name",
      name: "reg-com-company-name",
      formControlName: "companyName",
      label: "pages.regsiter.detail.information.input.personalName.label",
      sublabel: "pages.regsiter.detail.information.input.personalName.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputAddressInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "reg-com-company-house-no",
      name: "reg-com-company-house-no",
      formControlName: "houseNo",
      label: "pages.register.detail.address.information.input.houseNo.label",
      sublabel: "pages.register.detail.address.information.input.houseNo.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "reg-com-company-moo",
      name: "reg-com-company-moo",
      formControlName: "moo",
      label: "pages.register.detail.address.information.input.moo.label",
      sublabel: "pages.register.detail.address.information.input.moo.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "reg-com-company-building",
      name: "reg-com-company-building",
      formControlName: "building",
      label: "pages.register.detail.address.information.input.building.label",
      sublabel: "pages.register.detail.address.information.input.building.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "reg-com-company-soi",
      name: "reg-com-company-soi",
      formControlName: "soi",
      label: "pages.register.detail.address.information.input.soi.label",
      sublabel: "pages.register.detail.address.information.input.soi.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputAddressInformation2Config: StandardFormCardInputConfig[] = [
    {
      id: "reg-com-company-district",
      name: "reg-com-company-district",
      formControlName: "districtName",
      label: "pages.register.detail.address.information2.input.districtName.label",
      sublabel: "pages.register.detail.address.information2.input.districtName.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "reg-com-company-province",
      name: "reg-com-company-province",
      formControlName: "provinceName",
      label: "pages.register.detail.address.information2.input.provinceName.label",
      sublabel: "pages.register.detail.address.information2.input.provinceName.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "reg-com-company-postcode",
      name: "reg-com-company-postcode",
      formControlName: "postCode",
      label: "pages.register.detail.address.information2.input.postCode.label",
      sublabel: "pages.register.detail.address.information2.input.postCode.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "reg-com-company-phone",
      name: "reg-com-company-phone",
      formControlName: "companyPhone",
      label: "pages.register.detail.address.information2.input.companyPhone.label",
      sublabel: "pages.register.detail.address.information2.input.companyPhone.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.phone"},
      }
    },
    {
      id: "reg-com-company-email",
      name: "reg-com-company-email",
      formControlName: "companyEmail",
      label: "pages.register.detail.address.information2.input.companyEmail.label",
      sublabel: "pages.register.detail.address.information2.input.companyEmail.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.email.pattern"},
      }
    },

  ]
  public inputContactInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "reg-com-company-contact-name",
      name: "reg-com-company-contact-name",
      formControlName: "contactName",
      label: "pages.register.detail.contact.information.input.contactName.label",
      sublabel: "pages.register.detail.contact.information.input.contactName.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "reg-com-company-contact-lastname",
      name: "reg-com-company-contact-lastname",
      formControlName: "contactLastName",
      label: "pages.register.detail.contact.information.input.contactLastName.label",
      sublabel: "pages.register.detail.contact.information.input.contactLastName.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "reg-com-company-contact-phone",
      name: "reg-com-company-contact-phone",
      formControlName: "contactPhone",
      label: "pages.register.detail.contact.information.input.contactPhone.label",
      sublabel: "pages.register.detail.contact.information.input.contactPhone.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.phone"},
      }

    },
    {
      id: "reg-com-company-contact-email",
      name: "reg-com-company-contact-email",
      formControlName: "contactEmail",
      label: "pages.register.detail.contact.information.input.contactEmail.label",
      sublabel: "pages.register.detail.contact.information.input.contactEmail.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.email.pattern"},
      }

    },
  ]
  public inputUserInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "reg-user-firstname",
      name: "reg-user-firstname",
      formControlName: "firstName",
      label: 'pages.register.detail.user.information.input.firstName.label',
      sublabel: "pages.register.detail.user.information.input.firstName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "reg-user-lastname",
      name: "reg-user-lastname",
      formControlName: "lastName",
      label: "pages.register.detail.user.information.input.lastName.label",
      sublabel: "pages.register.detail.user.information.input.lastName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "reg-user-phone",
      name: "reg-user-phone",
      formControlName: "userPhone",
      label: 'pages.register.detail.user.information.input.userPhone.label',
      sublabel: "pages.register.detail.user.information.input.userPhone.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.phone"},
      }
    },
    {
      id: "reg-user-email",
      name: "reg-user-email",
      formControlName: "userEmail",
      label: "pages.register.detail.user.information.input.userEmail.label",
      sublabel: "pages.register.detail.user.information.input.userEmail.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.email.pattern"},
      }
    },
  ]
  public inputLoginInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "reg-user-username",
      name: "reg-user-username",
      formControlName: "username",
      label: 'pages.register.detail.login.information.input.username.label',
      sublabel: "pages.register.detail.login.information.input.username.sublabel",
      type: 'text',
      showInput: true,errorMessages:{
        'pattern': { message: "standard.validation.username.pattern"}
      }
    },
    {
      id: "empty",
      name: "empty",
      formControlName: "empty",
      label: 'empty',
      sublabel: "empty",
      type: 'empty',
      showInput: false,
    },
    {
      id: "reg-user-password",
      name: "reg-user-password",
      formControlName: "password",
      label: 'pages.register.detail.login.information.input.password.label',
      sublabel: "pages.register.detail.login.information.input.password.sublabel",
      type: 'password',
      showInput: true,errorMessages: {
        'pattern': { message: "standard.validation.password.pattern"},
      }
    },
    {
      id: "reg-user-confirm-password",
      name: "reg-user-confirm-password",
      formControlName: "passwordConfirm",
      label: 'pages.register.detail.login.information.input.passwordConfirm.label',
      sublabel: "pages.register.detail.login.information.input.passwordConfirm.sublabel",
      type: 'password',
      showInput: true,errorMessages: {
        'pattern': { message: "standard.validation.password.pattern"},
        'mustMatch': { message: "standard.validation.password.mustMatch"}
      }
    },
  ]


  constructor(
    private companyTypeService:StandardCompanyTypeService,
    private registerService: StandardRegisterManagementService,
    private confGlobalService: StandardConfGlobalService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
    // private alertService: AlertService,
  ) {
    super();
    this.isCreated = true;
    this.formGroup = this.formService.createFormGroup(RegisterForm);

    this.formGroup.addValidators(MustMatch('password', 'passwordConfirm') as ValidatorFn);
    this.formGroup.enable();
    this.formGroup.updateValueAndValidity();
    this.attachForm = new FormGroup({
      attachment: new FormArray([],[this.minLengthArray(1)])
    })
    this.getRegisterTypeList();
    this.getCompanyType();

    this.formGroup.controls.registerType?.valueChanges.subscribe((type) => {
      if(type){
        this.fieldRegisterTypeName = this.formGroup.controls.registerType.value == 1 ? "Company" : "Personal";
        if(this.formGroup.controls.registerType.value == 1){
          this.informationTitle = this.standardTranslateService.getTranslated(this.i18n.registerDetail.companyTitle);
          this.addressTitle = this.standardTranslateService.getTranslated(this.i18n.pageStandardTitle.companyAddressTitle);
          this.contactTitle = this.standardTranslateService.getTranslated(this.i18n.pageStandardTitle.companyContactTitle);
          this.policyTitle = this.standardTranslateService.getTranslated(this.i18n.pageStandardTitle.companyPolicyTitle);
          this.inputCompanyInformationConfig.filter(p => ["companyTypeId","companyBranch"].includes(p.formControlName)).map(map => {
            map.showInput = true;
          })
          this.inputVerificationConfig.filter(p => p.formControlName == "companyTaxId").map(async map => {
            map = await super.translate(this.i18n.registerDetail.companyTaxIdLabel,this.i18n.registerDetail.companyTaxIdSubLabel,map)
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyTypeId").map(async map => {
            map = await super.translate(this.i18n.registerDetail.companyTypeLabel,this.i18n.registerDetail.companyTypeSubLabel,map)
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyName").map(async map => {
            map = await super.translate(this.i18n.registerDetail.companyNameLabel,this.i18n.registerDetail.companyNameSubLabel,map)
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyTaxId").map(async map => {
            map = await super.translate(this.i18n.registerDetail.companyTaxIdLabel,this.i18n.registerDetail.companyTaxIdSubLabel,map)
          })
        }
        if(this.formGroup.controls.registerType.value == 2){
          this.formGroup.controls.companyBranch.setValue(null);
          this.formGroup.controls.companyTypeId.setValidators(null);
          this.formGroup.controls.companyBranch.setValidators(null);
          this.formGroup.updateValueAndValidity();
          this.informationTitle = this.standardTranslateService.getTranslated(this.i18n.registerDetail.personalTitle);
          this.addressTitle = this.standardTranslateService.getTranslated(this.i18n.pageStandardTitle.personalAddressTitle);
          this.contactTitle = this.standardTranslateService.getTranslated(this.i18n.pageStandardTitle.personalContactTitle);
          this.policyTitle = this.standardTranslateService.getTranslated(this.i18n.pageStandardTitle.personalPolicyTitle);
          this.inputCompanyInformationConfig.filter(p => ["companyTypeId","companyBranch"].includes(p.formControlName)).map(map => {
            map.showInput = false;
          })
          this.inputVerificationConfig.filter(p => p.formControlName == "companyTaxId").map(async map => {
            map = await super.translate(this.i18n.registerDetail.personalTaxIdLabel,this.i18n.registerDetail.personalTaxIdSubLabel,map)
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyTypeId").map(async map => {
            map = await super.translate(this.i18n.registerDetail.personalTypeLabel,this.i18n.registerDetail.personalTypeSubLabel,map)
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyName").map(async map => {
            map = await super.translate(this.i18n.registerDetail.personalNameLabel,this.i18n.registerDetail.personalNameSubLabel,map)
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyTaxId").map(async map => {
            map = await super.translate(this.i18n.registerDetail.personalTaxIdLabel,this.i18n.registerDetail.personalTaxIdSubLabel,map)
          })
        }
      }
    });
  }
  override ngOnInit(): void {
    this.getRegisterTypeList();
    this.getCompanyType();
    if (this.pageType === "edit") {
    }
    this.formGroup.controls.districtName.disable();
    this.formGroup.controls.provinceName.disable();
  }
  ngAfterViewInit(): void {
    this.updateTemplate();
  }

  updateTemplate(): void {
    this.inputVerificationConfig.filter(p => p.formControlName === "companyTaxId")[0].template = this.onlyNumber;
    this.cdr.detectChanges();
  }
  getAllConfig() {
    return new Promise((resolve) => {
      this.isLoading = true;
      this.confGlobalService.getAllConfig().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.configuration = res.data ? res.data : {};
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
  // Step 1
  /* -------------------- Verification --------------------*/
  getRegisterTypeList() {
    return new Promise((resolve) => {
      const params: SearchRegisterType = {
        code: this.configuration.REGISTER_TYPE == -1 ? null : this.configuration.REGISTER_TYPE
      };
      this.registerService.getRegisterTypeList(params).subscribe({
        next: (res) => {
          this._registerType = res.data ? res.data : [];
          this.inputVerificationConfig.filter(p => p.formControlName == "registerType").map(map => {
            map.options = this._registerType.map(registerType => this.mapToRegisterTypeList(registerType))
          })
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "registerType").map(map => {
            map.options = this._registerType.map(registerType => this.mapToRegisterTypeList(registerType))
          })
          this.inputPersonalInformationConfig.filter(p => p.formControlName == "registerType").map(map => {
            map.options = this._registerType.map(registerType => this.mapToRegisterTypeList(registerType))
          })
          resolve(this.inputVerificationConfig);
        },
        error: (err) => {
          console.log(err);
          resolve(null);
        }
      });
    });
  }
  mapToRegisterTypeList(item: RegisterType) {
    return { value: String(item.id), label: item.nameTh };
  }

  async verify(): Promise<boolean> {
    this.isLoading = true;
    return await this.processVerifyCompanyTaxId();
  }

  processVerifyCompanyTaxId() {
    this.isLoading = true;
    return new Promise<boolean>((resolve) => {
      let verifyForm = new FormGroup({
        companyTaxId: new FormControl(this.formGroup.controls.companyTaxId.value),
        registerType: new FormControl(this.formGroup.controls.registerType.value),
      });
      this.fetchDataService.verifyRegister(verifyForm.getRawValue()).subscribe({
        next: (res: StandardResponse<any>) => {
          this.isLoading = false;
          if (res.status.toLowerCase() === "success") {
            // if(this.pageType == 'edit'){
            //   this.alertService.alertDefaultSuccess("Company has been verified.");
            // }
            resolve(true);
          } else {
            this.alertService.alertDefaultError(res.message);
            resolve(false);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.alertService.alertDefaultError(err.message);
          console.log(err);
          resolve(false);
        }
      });
    });
  }
  /* -------------------- End Of Verification --------------------*/

  // Step 2
  /* -------------------- Company Information --------------------*/
  getCompanyType() {
    this.companyTypeService.getCompanyType().subscribe({
        next : (res) => {
          this.responseItemsCompanyType = (res && res.data) || [];
          this.inputCompanyInformationConfig.filter(p => p.formControlName == "companyTypeId").map(map => {
            map.options = this.responseItemsCompanyType.map(companyType => this.mapToCompanyTypeList(companyType))
            // map.label = `${this.fieldRegisterTypeName} Type`;
          })
        },
        error : (err) => {
          console.log(err.message);
        }
      });
  }
  mapToCompanyTypeList(item: ICompanyType) {
    return { value:  String(item.id), label: item.name };
  }

  checkVatCorporation() {
    return new Promise<any>((resolve) => {
      const params: CheckVatCorporation = {
        companyTaxId: this.formGroup.controls.companyTaxId.value
      };
      this.registerService.checkVatCorporation(params).subscribe({
        next: (res) => {
          if(res.data != null) {
            this.formGroup.controls.companyName.setValue(res.data.companyName);
            this.formGroup.controls.companyBranch.setValue(res.data.companyBranch);
            this.formGroup.controls.houseNo.setValue(res.data.houseNo);
            this.formGroup.controls.moo.setValue(res.data.moo);
            this.formGroup.controls.building.setValue(res.data.building);
            this.formGroup.controls.soi.setValue(res.data.soi);
            this.formGroup.controls.street.setValue(res.data.street);
            this.formGroup.controls.districtCode.setValue(res.data.districtCode);
            this.formGroup.controls.districtName.setValue(res.data.districtName);
            this.formGroup.controls.subDistrictCode.setValue(res.data.subDistrictCode);
            this.formGroup.controls.subDistrictName.setValue(res.data.subDistrictName);
            this.formGroup.controls.provinceCode.setValue(res.data.provinceCode);
            this.formGroup.controls.provinceName.setValue(res.data.provinceName);
            this.formGroup.controls.postCode.setValue(res.data.postCode);
          }
          resolve(null);
        },
        error: (err) => {
          console.log(err);
          resolve(null);
        }
      });
    });
  }
  subDistrictChange(data: any) {
    this.formGroup.controls.subDistrictCode.setValue(data.subDistrictCode);
    this.formGroup.controls.subDistrictName.setValue(data.subDistrictName);
    this.formGroup.controls.districtCode.setValue(data.districtCode);
    this.formGroup.controls.districtName.setValue(data.districtName);
    this.formGroup.controls.provinceCode.setValue(data.provinceCode);
    this.formGroup.controls.provinceName.setValue(data.provinceName);
    this.formGroup.controls.postCode.setValue(data.postCode);
  }
  subDistrictTypeaheadBase: TypeaheadBase = new TypeaheadBase({
    key: "subDistrictName",
    controlType: "subDistrictName",
    required: true,
    label: "Sub District",
    id: "cmnc-company-sub-district",
    typeaheadOptionField: "subDistrictName",
    // placeholder: "Sub District",
    maxlength: 255
  });
  /* -------------------- End Of Company Information --------------------*/


  // Step3
  /* -------------------- Attachment --------------------*/

  // createFormGroup() {
  //   this.attachForm = new FormGroup({
  //     attachment: new FormArray([])
  //   })
  // }

  async processRendering() {
    this.document = await this.getListRegisterAttachmentType(this.formGroup.controls.registerType.value);
    if(this.attachment && this.attachment.length > 0) {
      const fileArray = (this.attachment as FormArray).controls.map(control => control.value);
      fileArray.map((attach: File, i: number) => {
        this.fileMap.set(i, attach);
      });
    }
    this.patchDocumentFormControls(this.document);
  }
  patchDocumentFormControls(regisDoc: RegisterAttachmentDocumentType[]) {
    regisDoc.sort((a, b) => (a.sequence ?? Number.MAX_SAFE_INTEGER) - (b.sequence ?? Number.MAX_SAFE_INTEGER));

    regisDoc.forEach((p, i) => {
      const fileName = this.fileMap.get(p.sequence ?? -1)?.name || null;
      this.attachment.push(new FormControl(fileName, [Validators.required]));
    });
    }
    getListRegisterAttachmentType(registerType: number | null) {
      const params: SearchRegisterTypeAttachment = {
        registerType: registerType
      };
      return new Promise<any>((resolve) => {
        this.isLoading = true;
        this.registerService.getListRegisterAttachmentType(params).subscribe({
          next: (res) => {
            this.isLoading = false;
            resolve((res && res.data) || []);
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
            resolve([]);
          }
        })}
    );
  }
  get attachment() {
    return this.attachForm.get('attachment') as FormArray;
  }

  selectedFile(event:any, index: number) {
    const file: File = event.target.files[0];
    if (["application/pdf", "image/png", "image/jpg", "image/jpeg"].includes(file.type) && file.size <= this.allowFileSize * 1024 * 1024) {
      this.fileMap.set(index, file);
      this.attachment.at(index).setValue(file.name);
     } else {
       this.onRemoveFile(index);
    }
  }

  onRemoveFile(index:number) {
    (document.getElementById("regis-attachment-"+ index) as HTMLInputElement).value =
      "";
      this.fileMap.delete(index);
      this.attachment.at(index).setValue("");
  }

  minLengthArray(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if ((control as FormArray).length >= min) {
        return null;
      }
      return { minLength: true };
    };
  }

  /* -------------------- End Of Attachment --------------------*/


  // Step4
  /* -------------------- Submit --------------------*/
  regsiter(result: RegisterSession) {
    this.currentRegisterSession = result;
    const registerAprove = this.configuration.REGISTER_APPROVE || "0";
    this.createRegister(this.currentRegisterSession, registerAprove);
  }

  createRegister(result: RegisterSession, isAutoApprove: string) {
    this.isLoading = true;

    this.fetchDataService.createRegister({
      registerAttachmentId: result.registerAttachmentId,
      registerData: result.registerData
    }, result.attachment).subscribe({
      next: (res: StandardResponse<any>) => {
        this.isLoading = false;
        if (res.status && res.status.toLowerCase() === "success") {
          if(this.pageType == 'add'){
            this.alertService.alertDefaultSuccess(isAutoApprove == "1" ? this.i18n.register.alertMessageCreateRegisterSuccess :
              this.i18n.register.alertMessageUpdateRegisterSuccessWaitApprove).then((result)=>{
                if(result.isConfirmed)
                  this.router.navigate(["/auth/login"]);
              });
          }else{
            this.alertService.alertDefaultSuccess(this.i18n.register.alertMessageCreateRegisterSuccess).then((result)=>{
              super.onClosed();
            });
          }
        } else {
          this.alertService.alertDefaultError(res.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.alertService.alertDefaultError(err.message);
        console.log(err);
      }
    });
  }

  backToLogin(){
    this.router.navigate(['/auth/login'])
  }

  back(): void {
    if(this.step == 1 && this.pageType == "edit"){
      super.onClosed();
      return;
    }
    if(this.current == 1){
      this.formGroup.controls.registerType.enable();
      this.formGroup.controls.companyTaxId.enable();
      this.formGroup.updateValueAndValidity();
    }
    this.current -= 1;
    this.changeContent();
  }

  async next(): Promise<void> {
    this.isSubmit = false;
    if(this.step == 1 && (this.formGroup.controls.registerType.invalid || this.formGroup.controls.companyTaxId.invalid)){
      this.formGroup.controls.registerType.markAsTouched();
      this.formGroup.controls.companyTaxId.markAsTouched();
      this.formGroup.updateValueAndValidity();
      this.isSubmit = true;
      return;
    }
    if(this.step == 1){
      const verifyResponse = await this.verify();
      if(!verifyResponse){
        return;
      }
      if (!this.formGroup.controls.companyTypeId && this.currentRegisterSession.registerCheckVatCorporation === "1") {
        await this.checkVatCorporation();
      }
    }
    if(this.current == 0){
      this.formGroup.controls.registerType.disable();
      this.formGroup.controls.companyTaxId.disable();
      this.formGroup.updateValueAndValidity();
    }
    if(this.step == 2){

      this.formGroup.markAllAsTouched();
      const inputInvalidCompanyInfo = this.inputCompanyInformationConfig.some(e=> {
        const controlName = e.formControlName as keyof RegisterForm;
        return this.formGroup.controls[controlName].invalid;
      });
      const inputInvalidAddress = this.inputAddressInformationConfig.some(e=> {
        const controlName = e.formControlName as keyof RegisterForm;
        return this.formGroup.controls[controlName].invalid;
      });
      const inputInvalidAddress2 = this.inputAddressInformation2Config.some(e=> {
        const controlName = e.formControlName as keyof RegisterForm;
        return this.formGroup.controls[controlName].invalid;
      });
      const inputInvalidContact= this.inputContactInformationConfig.some(e=> {
        const controlName = e.formControlName as keyof RegisterForm;
        return this.formGroup.controls[controlName].invalid;
      });
      if(inputInvalidCompanyInfo || inputInvalidAddress || inputInvalidAddress2 || inputInvalidContact || this.formGroup.controls['subDistrictName'].invalid){
        this.isSubmit = true;
        return;
      }
      this.formGroup.markAsUntouched();
      if(!this.accessStep3)
        this.processRendering();
    }
    if(this.step == 3){
      this.accessStep3 = true;
      if(this.attachForm.invalid || this.attachment.invalid){
        this.attachment.markAllAsTouched();
        this.attachment.updateValueAndValidity();
        this.attachForm.markAllAsTouched();
        this.attachForm.updateValueAndValidity();
        return;
      }
    }
    this.current += 1;
    this.changeContent();

  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    this.isSubmit = true;
    if(this.formGroup.invalid){
      return;
    }
    const formData: Partial<RegisterForm> = this.formGroup.controls;
    let regis = new Register();
    regis.setValue(formData);
    this.currentRegisterSession.registerAttachment = this.configuration.REGISTER_ATTACHMENT;
    this.currentRegisterSession.registerCheckVatCorporation = this.configuration.REGISTER_CHECK_VAT_CORPORATION;
    this.currentRegisterSession.registerType = this.configuration.REGISTER_TYPE;
    this.currentRegisterSession.attachment = [...this.fileMap.values()];
    this.currentRegisterSession.registerData = regis;
    this.currentRegisterSession.registerAttachmentId = this.document
    .sort((a, b) => {
        const sequenceA = a.sequence ?? 0;
        const sequenceB = b.sequence ?? 0;
        return sequenceA - sequenceB;
    })
    .map(p => p.id) as number[];
    if(this.formGroup.controls.registerType.value == 2){
      let companyType =
        this.responseItemsCompanyType.find(
          p => p.registerType == this.formGroup.controls.registerType.value
        )?.id
      let companyTypeId = Number(companyType);
      this.formGroup.controls.companyTypeId.setValue(companyTypeId);
      this.currentRegisterSession.registerData.companyTypeId = companyTypeId;
    }
    this.regsiter(this.currentRegisterSession)
  }


  // translate(input: string)


}


