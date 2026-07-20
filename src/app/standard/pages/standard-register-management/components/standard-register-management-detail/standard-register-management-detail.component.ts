import { Component, inject } from '@angular/core';
import { ApproveRegister, Register, RegisterAttachmentDocumentType, RegisterForm, RegisterType, SearchRegisterAttachmentDocument, SearchRegisterAttachmentDocumentPayload, SearchRegisterType, SearchRegisterTypeAttachment } from '../../models/standard-register-management.model';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StandardRegisterManagementService } from '../../services/standard-register-management.service';
import { ActivatedRoute } from '@angular/router';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { StandardSubdistrictComponent } from '../../../standard-subdistrict/components/standard-subdistrict/standard-subdistrict.component';
import { StandardSearchSubDistrict, TypeaheadBase } from '../../../standard-subdistrict/models/standard-subdistrict.model';
import { StandardConfGlobalService } from '../../../../core/services/standard-conf-global.service';
import { StandardCompanyTypeService } from '../../../standard-company-type/services/standard-company-type.service';
import { ICompanyType } from '../../../standard-company-type/models/standard-company-type.model';
import { TranslateModule } from '@ngx-translate/core';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
@Component({
  selector: 'app-standard-register-management-detail',
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
    TranslateModule
  ],
  templateUrl: './standard-register-management-detail.component.html',
  styleUrl: './standard-register-management-detail.component.scss'
})
export class StandardRegisterManagementDetailComponent extends StandardFormComponent<Register> {
  public override pageTitle: string = this.i18n.register.pageTitle;
  public override fetchDataService: StandardRegisterManagementService = inject(StandardRegisterManagementService);
  public standardTransalteService: StandardTranslateService = inject(StandardTranslateService);
  public formGroup: FormGroup<RegisterForm>;
  fieldRegisterTypeName: string = "";
  public responseItemSubDistrict: StandardSearchSubDistrict[] = [];
  public responseItemsCompanyType: ICompanyType[] = [];
  public _registerType: RegisterType[] = [];
  public register!: Register;
  public document: RegisterAttachmentDocumentType[] = [];
  public configuration: any = {};
  public registerId: string | null = "";
  public streetLabel: string = "pages.register.management.detail.address.information.input.street.label";
  public streetSubLabel: string = "pages.register.management.detail.address.information.input.street.sublabel";
  public rejectLabel: string = "pages.register.management.detail.input.rejectReason.label";
  public rejectSubLabel: string = "pages.register.management.detail.input.rejectReason.sublabel";
  public permissionApprove: boolean = false;
  public permissionReject: boolean = false;
  public informationTitle:string  = "";
  public addressTitle:string  = "";
  public contactTitle:string  = "";
  public inputInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-register-type",
      name: "cmnc-company-register-type",
      formControlName: "registerType",
      label: "pages.regsiter.management.detail.information.select.registerType.label",
      sublabel: "pages.regsiter.management.detail.information.select.registerType.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "empty",
      name: "empty",
      formControlName: "empty",
      label: "empty",
      sublabel: "empty",
      type: "empty",
      showInput: false
    },
    {
      id: "cmnc-company-type",
      name: "cmnc-company-type",
      formControlName: "companyTypeId",
      label: "pages.regsiter.management.detail.information.select.companyTypeId.label",
      sublabel: "pages.regsiter.management.detail.information.select.companyTypeId.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "cmnc-company-tax-id",
      name: "cmnc-company-tax-id",
      formControlName: "companyTaxId",
      label: "pages.regsiter.management.detail.information.input.companyTaxId.label",
      sublabel: "pages.regsiter.management.detail.information.input.companyTaxId.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "cmnc-company-name",
      name: "cmnc-company-name",
      formControlName: "companyName",
      label: "pages.regsiter.management.detail.information.input.companyName.label",
      sublabel: "pages.regsiter.management.detail.information.input.companyName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-branch",
      name: "cmnc-company-branch",
      formControlName: "companyBranch",
      label: "pages.regsiter.management.detail.information.input.companyBranch.label",
      sublabel: "pages.regsiter.management.detail.information.input.companyBranch.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputPersonalInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-register-type",
      name: "cmnc-company-register-type",
      formControlName: "registerType",
      label: "pages.regsiter.detail.information.select.registerType.label",
      sublabel: "pages.regsiter.detail.information.select.registerType.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "cmnc-company-tax-id",
      name: "cmnc-company-tax-id",
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
      id: "cmnc-company-name",
      name: "cmnc-company-name",
      formControlName: "companyName",
      label: "pages.regsiter.detail.information.input.personalName.label",
      sublabel: "pages.regsiter.detail.information.input.personalName.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputAddressInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-house-no",
      name: "cmnc-company-house-no",
      formControlName: "houseNo",
      label: "pages.register.management.detail.address.information.input.houseNo.label",
      sublabel: "pages.register.management.detail.address.information.input.houseNo.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-moo",
      name: "cmnc-company-moo",
      formControlName: "moo",
      label: "pages.register.management.detail.address.information.input.moo.label",
      sublabel: "pages.register.management.detail.address.information.input.moo.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-building",
      name: "cmnc-company-building",
      formControlName: "building",
      label: "pages.register.management.detail.address.information.input.building.label",
      sublabel: "pages.register.management.detail.address.information.input.building.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-soi",
      name: "cmnc-company-soi",
      formControlName: "soi",
      label: "pages.register.management.detail.address.information.input.soi.label",
      sublabel: "pages.register.management.detail.address.information.input.soi.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputAddressInformation2Config: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-district",
      name: "cmnc-company-district",
      formControlName: "districtName",
      label: "pages.register.management.detail.address.information2.input.districtName.label",
      sublabel: "pages.register.management.detail.address.information2.input.districtName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-province",
      name: "cmnc-company-province",
      formControlName: "provinceName",
      label: "pages.register.management.detail.address.information2.input.provinceName.label",
      sublabel: "pages.register.management.detail.address.information2.input.provinceName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-postcode",
      name: "cmnc-company-postcode",
      formControlName: "postCode",
      label: "pages.register.management.detail.address.information2.input.postCode.label",
      sublabel: "pages.register.management.detail.address.information2.input.postCode.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-phone",
      name: "cmnc-company-phone",
      formControlName: "companyPhone",
      label: "pages.register.management.detail.address.information2.input.companyPhone.label",
      sublabel: "pages.register.management.detail.address.information2.input.companyPhone.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-email",
      name: "cmnc-company-email",
      formControlName: "companyEmail",
      label: "pages.register.management.detail.address.information2.input.companyEmail.label",
      sublabel: "pages.register.management.detail.address.information2.input.companyEmail.sublabel",
      type: 'text',
      showInput: true,
    },

  ]
  public inputContactInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-contact-name",
      name: "cmnc-company-contact-name",
      formControlName: "contactName",
      label: "pages.register.management.detail.contact.information.input.contactName.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactName.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "cmnc-company-contact-lastname",
      name: "cmnc-company-contact-lastname",
      formControlName: "contactLastName",
      label: "pages.register.management.detail.contact.information.input.contactLastName.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactLastName.sublabel",
      type: 'text',
      showInput: true,

    },
    {
      id: "cmnc-company-contact-phone",
      name: "cmnc-company-contact-phone",
      formControlName: "contactPhone",
      label: "pages.register.management.detail.contact.information.input.contactPhone.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactPhone.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-contact-email",
      name: "cmnc-company-contact-email",
      formControlName: "contactEmail",
      label: "pages.register.management.detail.contact.information.input.contactEmail.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactEmail.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputUserInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-user-first-name",
      name: "cmnc-company-user-first-name",
      formControlName: "firstName",
      label: 'pages.register.management.detail.user.information.input.firstName.label',
      sublabel: "pages.register.management.detail.user.information.input.firstName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-user-last-name",
      name: "cmnc-company-user-last-name",
      formControlName: "lastName",
      label: "pages.register.management.detail.user.information.input.lastName.label",
      sublabel: "pages.register.management.detail.user.information.input.lastName.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-user-phone",
      name: "cmnc-company-user-phone",
      formControlName: "userPhone",
      label: 'pages.register.management.detail.user.information.input.userPhone.label',
      sublabel: "pages.register.management.detail.user.information.input.userPhone.sublabel",
      type: 'text',
      showInput: true,
    },
    {
      id: "cmnc-company-user-email",
      name: "cmnc-company-user-email",
      formControlName: "userEmail",
      label: "pages.register.management.detail.user.information.input.userEmail.label",
      sublabel: "pages.register.management.detail.user.information.input.userEmail.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public inputLoginInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-username",
      name: "cmnc-company-username",
      formControlName: "username",
      label: 'pages.register.management.detail.login.information.input.username.label',
      sublabel: "pages.register.management.detail.login.information.input.username.sublabel",
      type: 'text',
      showInput: true,
    },
  ]
  public  swalConfigs: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };
  constructor(

    private companyTypeService:StandardCompanyTypeService,
    private registerService: StandardRegisterManagementService,
    private confGlobalService: StandardConfGlobalService,
    private route: ActivatedRoute,
    // private alertService: AlertService,
  ) {
    super();
    this.isCreated = true;
    this.formGroup = this.formService.createFormGroup(RegisterForm);
    this.formGroup.disable();
    this.formGroup.updateValueAndValidity();
    this.route.paramMap.subscribe((params) => {
      this.registerId = params.get("id");
    });
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['REGISTER_APPROVE'], this.APP_PERMISSION['REGISTER_REJECT']]);
    this.permissionReject = this.permissions.checkPermissionList([this.APP_PERMISSION['REGISTER_REJECT']]);
    this.permissionApprove = this.permissions.checkPermissionList([this.APP_PERMISSION['REGISTER_APPROVE']]);
  }

  override async ngOnInit(): Promise<void> {
    this.getAllConfig();
    if (this.pageType === "edit") {
    await this.fetchData();
    }
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
  async getRegisterTypeList() {
    return new Promise((resolve) => {
      const params: SearchRegisterType = {
        code: this.configuration.REGISTER_TYPE == -1 ? null : this.configuration.REGISTER_TYPE
        // code: null
      };
      this.registerService.getRegisterTypeList(params).subscribe({
        next: (res) => {
          this._registerType = res.data ? res.data : [];
          this.inputInformationConfig.filter(p => p.formControlName == "registerType").map(map => {
            map.options = this._registerType.map(registerType => this.mapToRegisterTypeList(registerType))
          })
          this.inputPersonalInformationConfig.filter(p => p.formControlName == "registerType").map(map => {
            map.options = this._registerType.map(registerType => this.mapToRegisterTypeList(registerType))
          })
          resolve(this.inputInformationConfig);
        },
        error: (err) => {
          console.log(err);
          resolve(null);
        }
      });
    });
  }
  mapToRegisterTypeList(item: RegisterType) {
    return { value: item.id, label: item.nameTh };
  }
  async getCompanyType() {
    await this.companyTypeService.getCompanyType().subscribe({
        next : (res) => {
          this.responseItemsCompanyType = (res && res.data) || [];
          this.inputInformationConfig.filter(p => p.formControlName == "companyTypeId").map(async map => {
            map.options = this.responseItemsCompanyType.map(companyType => this.mapToCompanyTypeList(companyType))
            map.label = `${this.fieldRegisterTypeName} Type`;
            if(this.formGroup.controls.registerType.value == 1){
              map = await super.translate(this.i18n.register.companyTypeLabel,this.i18n.register.companyTypeSubLabel,map)
              map = await super.translate(this.i18n.register.companyTypeLabel,this.i18n.register.companyTypeSubLabel,map)
            }else{
              map = await super.translate(this.i18n.register.personalTypeLabel,this.i18n.register.personalTypeSubLabel,map)
              map = await super.translate(this.i18n.register.personalTypeLabel,this.i18n.register.personalTypeSubLabel,map)
            }
          })
        },
        error : (err) => {
          console.log(err.message);
        }
      });
  }
  mapToCompanyTypeList(item: ICompanyType) {
    return { value:  item.id, label: item.name };
  }

  override async fetchData() {
    await this.registerService.getRegisterById(this.registerId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.register = res.data ? res.data : {} as Register;
        this.patchFormControls(this.register);
        if(this.formGroup.controls.registerType.value == 1){
          this.informationTitle = this.standardTransalteService.getTranslated(this.i18n.pageStandardTitle.companyInformationTitle);
          this.addressTitle = this.standardTransalteService.getTranslated(this.i18n.pageStandardTitle.companyAddressTitle);
          this.contactTitle = this.standardTransalteService.getTranslated(this.i18n.pageStandardTitle.companyContactTitle);
        }else{
          this.informationTitle = this.standardTransalteService.getTranslated(this.i18n.pageStandardTitle.personalInformationTitle);
          this.addressTitle = this.standardTransalteService.getTranslated(this.i18n.pageStandardTitle.personalAddressTitle);
          this.contactTitle = this.standardTransalteService.getTranslated(this.i18n.pageStandardTitle.personalContactTitle);
        }
         this.getRegisterTypeList();
         this.getCompanyType();
         this.getListRegisterAttachmentType(this.formGroup.controls.registerType.value);

      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        // resolve(null);
      }
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
    id: "reg-com-company-sub-district",
    typeaheadOptionField: "subDistrictName",
    placeholder: "Sub District",
    maxlength: 255
  });

  getListRegisterAttachmentType(registerType: number | null) {
    const params: SearchRegisterTypeAttachment = {
      registerType: registerType
    };
    this.isLoading = true;
    this.registerService.getListRegisterAttachmentType(params).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.document = res.data ? res.data : [];
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
  processView(attachmentTypeId: number | null) {
    this.getRegisterAttachment(attachmentTypeId);
  }
  getRegisterAttachment(attachmentTypeId:any) {
    this.isLoading = true;
    const params: SearchRegisterAttachmentDocument = {
      registerId: this.registerId == null ? "": this.registerId,
      attachmentTypeId: attachmentTypeId
    };
    this.registerService.getRegisterAttachment(params).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.data && res.data.id) {
          this.getRegisterAttachmentPayload(res.data.id, res.data.contentType);
        } else {
          this.alertService.alertDefaultError(this.i18n.alert.notFoundDoc);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
  getRegisterAttachmentPayload(id: string, contentType: string) {
    this.isLoading = true;
    const params: SearchRegisterAttachmentDocumentPayload = {
      id: id
    };
    this.registerService.getRegisterAttachmentPayload(params).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.size != 0) {
          let payload = new Blob([res], { type: contentType });
          let url = URL.createObjectURL(payload);
          window.open(url);
        } else {
          this.alertService.alertDefaultError(this.i18n.alert.documentEmpty);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  processApprove() {
    this._processApproveReject(true);
  }

  processReject() {
    !this.formGroup.controls.rejectReason.value ? this.alertService.alertDefaultError(this.i18n.alert.rejectReason) : this._processApproveReject(false);
  }

  // processApproveReject(status: boolean) {
  //   Swal.fire({
  //     title: "",
  //     html: "Please wait ..",
  //     allowOutsideClick: false,
  //     onBeforeOpen: () => {
  //         Swal.showLoading();
  //         this._processApproveReject(status);
  //     },
  //   });
  // }

  _processApproveReject(status: boolean) {
    let user = JSON.parse(sessionStorage.getItem('currentUser') ?? "{}");
    const params: ApproveRegister = {
      id: this.registerId != null ? this.registerId: '',
      approve: status,
      approveBy: user.uid,
      rejectReason: this.formGroup.controls.rejectReason.value != null ? this.formGroup.controls.rejectReason.value : ''
    };
    this.registerService.approveRejectRegister(params).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(status ? this.i18n.alert.approveComplete : this.i18n.alert.rejectComplete);
        } else {
          this.alertService.alertDefaultError(res.message ? res.message : this.i18n.alert.contactAdministrator);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }
}
