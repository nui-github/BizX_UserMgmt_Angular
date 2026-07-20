import { ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { StandardFormComponent } from "../../../../shared/abstracts/components/standard-form/standard-form.component";
import {
  StandardFormCardComponent,
  StandardFormCardInputConfig,
} from "../../../../shared/components/standard-form-card/standard-form-card.component";
import {
  CheckVatCorporation,
  ICompany,
  ICompany_V2,
  StandardCompanyCreateForm,
} from "../../models/standard-company.model";
import { StandardCompanyService } from "../../services/standard-company.service";
import { FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { StandardRegisterManagementService } from "../../../standard-register-management/services/standard-register-management.service";
import { StandardCompanyTypeService } from "../../../standard-company-type/services/standard-company-type.service";
import { ICompanyType } from "../../../standard-company-type/models/standard-company-type.model";
import {
  RegisterType,
  SearchRegisterType,
} from "../../../standard-register-management/models/standard-register-management.model";
import { StandardConfGlobalService } from "../../../../core/services/standard-conf-global.service";
import { StandardAppPermissionService } from "../../../../core/services/standard-app-permission.service";
import { CommonModule } from "@angular/common";
import { StandardSubdistrictComponent } from "../../../standard-subdistrict/components/standard-subdistrict/standard-subdistrict.component";
import {
  StandardSearchSubDistrict,
  TypeaheadBase,
} from "../../../standard-subdistrict/models/standard-subdistrict.model";
import { StandardSubdistrictService } from "../../../standard-subdistrict/services/standard-subdistrict.service";
import { NzFormModule } from "ng-zorro-antd/form";
import { StandardErrorMessageComponent } from "../../../../shared/components/standard-error-message/standard-error-message.component";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { StandardTranslateService } from "../../../../shared/service/standard-translate.service";
import { NumberInputDirective } from "../../../../shared/directives/standard-number-input.directive";
import { NzSelectModule } from "ng-zorro-antd/select";
import { CompanyTemplateConfigComponent } from "../company-template-config/company-template-config.component";
@Component({
  selector: "app-standard-company-detail",
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    StandardFormCardComponent,
    StandardSubdistrictComponent,
    StandardErrorMessageComponent,
    NzFormModule,
    TranslateModule,
    ReactiveFormsModule,
    NumberInputDirective,
    NzSelectModule,
    CompanyTemplateConfigComponent,
  ],
  templateUrl: "./standard-company-detail.component.html",
  styleUrl: "./standard-company-detail.component.scss",
})
export class StandardCompanyDetailComponent extends StandardFormComponent<ICompany_V2> {
  public override fetchDataService: StandardCompanyService = inject(StandardCompanyService);
  public override pageTitle: string = "Company";
  public responseItemsCompany: ICompany[] = [];
  public responseItemsCompanyType: ICompanyType[] = [];
  public _registerType: RegisterType[] = [];
  public responseItemSubDistrict: StandardSearchSubDistrict[] = [];
  public configuration: any = {};
  public step: number = 1;
  ReadOnlyStyleGuideNotes: boolean = false;
  public formGroup: FormGroup<StandardCompanyCreateForm>;
  public streetLabel: string = "pages.company.detail.address.information.input.street.label";
  public streetSubLabel: string = "pages.company.detail.address.information.input.street.sublabel";
  public standardTranslate: StandardTranslateService = inject(StandardTranslateService);

  companiesInformationId: string | null = null;
  fieldRegisterTypeName: string = "";
  selectedType: boolean = false;
  public cpid: string | null = null;
  public company: ICompany = new ICompany();
  private companyTypeId: string | null = null;
  public informationTilte = "";
  public addressTilte = "";
  public contactTilte = "";
  public policyTitle = "";
  public inputStep1Config: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-register-type",
      name: "cmnc-company-register-type",
      formControlName: "registerType",
      label: "pages.company.detail.step1.select.registerType.label",
      sublabel: "pages.company.detail.step1.select.registerType.sublabel",
      type: "selectValidate",
      showInput: true,
    },
    {
      id: "cmnc-company-tax-id",
      name: "cmnc-company-tax-id",
      formControlName: "companyTaxId",
      label: "pages.company.detail.step1.input.companyTaxId.label",
      sublabel: "pages.company.detail.step1.input.companyTaxId.sublabel",
      type: "custom",
      showInput: true,
      errorMessages: {
        pattern: { message: "standard.validation.number" },
        minLength: { message: "standard.validation.tax.id.minlength" },
      },
    },
  ];
  public inputInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-register-type",
      name: "cmnc-company-register-type",
      formControlName: "registerType",
      label: "pages.company.detail.step1.select.registerType.label",
      sublabel: "pages.company.detail.step1.select.registerType.sublabel",
      type: "selectValidate",
      showInput: true,
    },
    {
      id: "empty",
      name: "empty",
      formControlName: "empty",
      label: "empty",
      sublabel: "empty",
      type: "empty",
      showInput: false,
    },
    {
      id: "cmnc-company-type",
      name: "cmnc-company-type",
      formControlName: "companyTypeId",
      label: "pages.company.detail.information.select.companyTypeId.label",
      sublabel: "pages.company.detail.information.select.companyTypeId.sublabel",
      type: "selectValidate",
      showInput: true,
    },
    {
      id: "cmnc-company-tax-id",
      name: "cmnc-company-tax-id",
      formControlName: "companyTaxId",
      label: "pages.company.detail.information.input.companyTaxId.label",
      sublabel: "pages.company.detail.information.input.companyTaxId.sublabel",
      type: "text",
      showInput: true,
      errorMessages: {
        pattern: { message: "standard.validation.tax.id.pattern" },
        minLength: { message: "standard.validation.tax.id.minlength" },
      },
    },
    {
      id: "cmnc-company-name",
      name: "cmnc-company-name",
      formControlName: "name",
      label: "pages.company.detail.information.input.name.label",
      sublabel: "pages.company.detail.information.input.name.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-branch",
      name: "cmnc-company-branch",
      formControlName: "companyBranch",
      label: "pages.company.detail.information.input.companyBranch.label",
      sublabel: "pages.company.detail.information.input.companyBranch.sublabel",
      type: "text",
      showInput: true,
    },
  ];
  public inputAddressInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-house-no",
      name: "cmnc-company-house-no",
      formControlName: "houseNo",
      label: "pages.register.management.detail.address.information.input.houseNo.label",
      sublabel: "pages.register.management.detail.address.information.input.houseNo.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-moo",
      name: "cmnc-company-moo",
      formControlName: "moo",
      label: "pages.register.management.detail.address.information.input.moo.label",
      sublabel: "pages.register.management.detail.address.information.input.moo.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-building",
      name: "cmnc-company-building",
      formControlName: "building",
      label: "pages.register.management.detail.address.information.input.building.label",
      sublabel: "pages.register.management.detail.address.information.input.building.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-soi",
      name: "cmnc-company-soi",
      formControlName: "soi",
      label: "pages.register.management.detail.address.information.input.soi.label",
      sublabel: "pages.register.management.detail.address.information.input.soi.sublabel",
      type: "text",
      showInput: true,
    },
  ];
  public inputAddressInformation2Config: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-district",
      name: "cmnc-company-district",
      formControlName: "districtName",
      label: "pages.register.management.detail.address.information2.input.districtName.label",
      sublabel: "pages.register.management.detail.address.information2.input.districtName.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-province",
      name: "cmnc-company-province",
      formControlName: "provinceName",
      label: "pages.register.management.detail.address.information2.input.provinceName.label",
      sublabel: "pages.register.management.detail.address.information2.input.provinceName.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-postcode",
      name: "cmnc-company-postcode",
      formControlName: "postCode",
      label: "pages.register.management.detail.address.information2.input.postCode.label",
      sublabel: "pages.register.management.detail.address.information2.input.postCode.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-phone",
      name: "cmnc-company-phone",
      formControlName: "companyPhone",
      label: "pages.register.management.detail.address.information2.input.companyPhone.label",
      sublabel: "pages.register.management.detail.address.information2.input.companyPhone.sublabel",
      type: "text",
      showInput: true,
      errorMessages: {
        pattern: { message: "standard.validation.phone.pattern" },
      },
    },
    {
      id: "cmnc-company-email",
      name: "cmnc-company-email",
      formControlName: "companyEmail",
      label: "pages.register.management.detail.address.information2.input.companyEmail.label",
      sublabel: "pages.register.management.detail.address.information2.input.companyEmail.sublabel",
      type: "text",
      showInput: true,
      errorMessages: {
        pattern: { message: "standard.validation.email.pattern" },
      },
    },
  ];
  public inputContactInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-contact-name",
      name: "cmnc-company-contact-name",
      formControlName: "contactName",
      label: "pages.register.management.detail.contact.information.input.contactName.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactName.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-contact-lastname",
      name: "cmnc-company-contact-lastname",
      formControlName: "contactLastName",
      label: "pages.register.management.detail.contact.information.input.contactLastName.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactLastName.sublabel",
      type: "text",
      showInput: true,
    },
    {
      id: "cmnc-company-contact-phone",
      name: "cmnc-company-contact-phone",
      formControlName: "contactPhone",
      label: "pages.register.management.detail.contact.information.input.contactPhone.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactPhone.sublabel",
      type: "text",
      showInput: true,
      errorMessages: {
        pattern: { message: "standard.validation.phone.pattern" },
      },
    },
    {
      id: "cmnc-company-contact-email",
      name: "cmnc-company-contact-email",
      formControlName: "contactEmail",
      label: "pages.register.management.detail.contact.information.input.contactEmail.label",
      sublabel: "pages.register.management.detail.contact.information.input.contactEmail.sublabel",
      type: "text",
      showInput: true,
    },
  ];

  public inputPolicyInformationConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-limit-user",
      name: "cmnc-limit-user",
      formControlName: "limitUser",
      label: "pages.company.detail.policy.information.number.limitUser.label",
      sublabel: "pages.company.detail.policy.information.number.limitUser.sublabel",
      type: "checkboxInput",
      showInput: true,
      checkBoxLabel: "pages.company.detail.policy.information.number.limitUser.checkboxlabel",
    },
    {
      id: "cmnc-limit-login",
      name: "cmnc-limit-login",
      formControlName: "limitTryPassword",
      label: "pages.company.detail.policy.information.number.limitTryPassword.label",
      sublabel: "pages.company.detail.policy.information.number.limitTryPassword.sublabel",
      type: "checkboxInput",
      showInput: true,
      checkBoxLabel: "pages.company.detail.policy.information.number.limitTryPassword.checkboxlabel",
    },
    {
      id: "cmnc-limit-pwd",
      name: "cmnc-limit-pwd",
      formControlName: "limitRepeatPassword",
      label: "pages.company.detail.policy.information.number.limitRepeatPassword.label",
      sublabel: "pages.company.detail.policy.information.number.limitRepeatPassword.sublabel",
      type: "checkboxInput",
      showInput: true,

      checkBoxLabel: "pages.company.detail.policy.information.number.limitRepeatPassword.checkboxlabel",
    },
    {
      id: "cmnc-passwordExpireDays",
      name: "cmnc-passwordExpireDays",
      formControlName: "passwordExpireDays",
      label: "pages.company.detail.policy.information.number.passwordExpireDays.label",
      sublabel: "pages.company.detail.policy.information.number.passwordExpireDays.sublabel",
      type: "checkboxInput",
      showInput: true,
      checkBoxLabel: "pages.company.detail.policy.information.number.passwordExpireDays.checkboxlabel",
    },
    {
      id: "cmnc-limitSessionInSec",
      name: "cmnc-limitSessionInSec",
      formControlName: "limitSessionInSec",
      label: "pages.company.detail.policy.information.number.limitSessionInSec.label",
      sublabel: "pages.company.detail.policy.information.number.limitSessionInSec.sublabel",
      type: "number",
      showInput: true,
    },
    {
      id: "cmnc-idleSessionInSec",
      name: "cmnc-idleSessionInSec",
      formControlName: "idleSessionInSec",
      label: "pages.company.detail.policy.information.number.idleSessionInSec.label",
      sublabel: "pages.company.detail.policy.information.number.idleSessionInSec.sublabel",
      type: "number",
      showInput: true,
    },
  ];

  @ViewChild("onlyNumber") public onlyNumber!: TemplateRef<any>;

  constructor(
    public permission: StandardAppPermissionService,
    private companyTypeService: StandardCompanyTypeService,
    private registerService: StandardRegisterManagementService,
    private confGlobalService: StandardConfGlobalService,
    private subDistrictService: StandardSubdistrictService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    this.isCreated = true;
    this.formGroup = this.formService.createFormGroup(StandardCompanyCreateForm);
    this.hasPermissions = this.permissions.checkPermissionList([
      this.APP_PERMISSION["COMPANY_CREATE"],
      this.APP_PERMISSION["COMPANY_EDIT"],
    ]);

    this.formGroup.controls.registerType?.valueChanges.subscribe((type) => {
      if (type) {
        this.fieldRegisterTypeName = this.formGroup.controls.registerType.value == 1 ? "Company" : "Personal";
        if (this.formGroup.controls.registerType.value == 1) {
          this.informationTilte = this.standardTranslate.getTranslated(
            this.i18n.pageStandardTitle.companyInformationTitle,
          );
          this.addressTilte = this.standardTranslate.getTranslated(this.i18n.pageStandardTitle.companyAddressTitle);
          this.contactTilte = this.standardTranslate.getTranslated(this.i18n.pageStandardTitle.companyContactTitle);
          this.policyTitle = this.standardTranslate.getTranslated(this.i18n.pageStandardTitle.companyPolicyTitle);
          this.inputStep1Config
            .filter((p) => p.formControlName == "companyTaxId")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.companyTaxIdLabel,
                this.i18n.company.companyTaxIdSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "companyTypeId")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.companyTypeLabel,
                this.i18n.company.companyTypeSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "name")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.companyNameLabel,
                this.i18n.company.companyNameSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "companyTaxId")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.companyTaxIdLabel,
                this.i18n.company.companyTaxIdSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "companyBranch")
            .map((map) => {
              map.showInput = true;
            });
        } else {
          this.informationTilte = this.standardTranslate.getTranslated(
            this.i18n.pageStandardTitle.personalInformationTitle,
          );
          this.addressTilte = this.standardTranslate.getTranslated(this.i18n.pageStandardTitle.personalAddressTitle);
          this.contactTilte = this.standardTranslate.getTranslated(this.i18n.pageStandardTitle.personalContactTitle);
          this.policyTitle = this.standardTranslate.getTranslated(this.i18n.pageStandardTitle.personalPolicyTitle);
          this.inputStep1Config
            .filter((p) => p.formControlName == "companyTaxId")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.personalTaxIdLabel,
                this.i18n.company.personalTaxIdSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "companyTypeId")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.personalTypeLabel,
                this.i18n.company.personalTypeSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "name")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.personalNameLabel,
                this.i18n.company.personalNameSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "companyTaxId")
            .map(async (map) => {
              map = await super.translate(
                this.i18n.company.personalTaxIdLabel,
                this.i18n.company.personalTaxIdSubLabel,
                map,
              );
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "companyBranch")
            .map((map) => {
              map.showInput = false;
            });
        }
        this.getRegisterTypeList();
      } else {
        this.formGroup.controls.registerType.markAsTouched();
        this.formGroup.controls.registerType.markAsDirty();
        this.formGroup.updateValueAndValidity();
      }
    });
  }

  override ngOnInit(): void {
    this.getRegisterTypeList();
    if (this.pageType !== "edit") {
      this.getCompanyType();
    }
    // super.ngOnInit();
    if (this.pageType === "edit") {
      this.selectedType = true;
      this.fetchData();
      this.isEditCompanyData();
      this.formGroup.controls.name.disable();
      this.formGroup.controls.registerType.disable();
      this.formGroup.controls.companyTaxId.disable();
    }
  }

  ngAfterViewInit(): void {
    this.updateTemplate();
  }

  updateTemplate(): void {
    this.inputStep1Config.filter((p) => p.formControlName === "companyTaxId")[0].template = this.onlyNumber;
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
        },
      });
    });
  }

  getRegisterTypeList() {
    return new Promise((resolve) => {
      const params: SearchRegisterType = {
        code: this.configuration.REGISTER_TYPE == -1 ? null : this.configuration.REGISTER_TYPE,
      };
      this.registerService.getRegisterTypeList(params).subscribe({
        next: (res) => {
          this._registerType = res.data ? res.data : [];
          this.inputStep1Config
            .filter((p) => p.formControlName == "registerType")
            .map((map) => {
              map.options = this._registerType.map((registerType) => this.mapToRegisterTypeList(registerType));
            });
          this.inputInformationConfig
            .filter((p) => p.formControlName == "registerType")
            .map((map) => {
              map.options = this._registerType.map((registerType) => this.mapToRegisterTypeList(registerType));
            });
          resolve(this.inputInformationConfig);
        },
        error: (err) => {
          console.log(err);
          resolve(null);
        },
      });
    });
  }
  mapToRegisterTypeList(item: RegisterType) {
    return { value: String(item.id), label: item.nameTh };
  }

  getCompanyType() {
    this.companyTypeService.getCompanyType().subscribe({
      next: (res) => {
        this.responseItemsCompanyType = (res && res.data) || [];
        this.inputInformationConfig
          .filter((p) => p.formControlName == "companyTypeId")
          .map(async (map) => {
            map.options = this.responseItemsCompanyType.map((companyType) => this.mapToCompanyTypeList(companyType));
            if (this.formGroup.controls.registerType.value == 1) {
              map = await super.translate(
                this.i18n.company.companyTypeLabel,
                this.i18n.company.companyTypeSubLabel,
                map,
              );
            } else {
              map = await super.translate(
                this.i18n.company.personalTypeLabel,
                this.i18n.company.personalTypeSubLabel,
                map,
              );
            }
          });
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  mapToCompanyTypeList(item: ICompanyType) {
    return { value: String(item.id), label: item.name };
  }

  typeChange() {
    this.getCompanyTypeByRegisterType(this.formGroup.controls.registerType.value);
    this.inputInformationConfig
      .filter((p) => p.formControlName == "companyTypeId")
      .map(async (map) => {
        map.options = this.responseItemsCompanyType.map((companyType) => this.mapToCompanyTypeList(companyType));
        if (this.formGroup.controls.registerType.value == 1) {
          map = await super.translate(this.i18n.company.companyTypeLabel, this.i18n.company.companyTypeSubLabel, map);
        } else {
          map = await super.translate(this.i18n.company.personalTypeLabel, this.i18n.company.personalTypeSubLabel, map);
        }
      });
    if (this.formGroup.controls.registerType.value == 1) {
      this.formGroup.controls.companyBranch.setValidators([Validators.required]);
    } else {
      this.formGroup.controls.companyBranch.setValidators([]);
    }
    if (this.step == 1) {
      return;
    }
    this.selectedType = true;
    this.formGroup.controls.companyTypeId.setValue("");
    this.formGroup.controls.companyBranch.setValue("");
    this.formGroup.controls.name.setValue("");
    this.formGroup.controls.companyPhone.setValue("");
    this.formGroup.controls.companyEmail.setValue("");
    this.formGroup.controls.contactName.setValue("");
    this.formGroup.controls.contactLastName.setValue("");
    this.formGroup.controls.contactPhone.setValue("");
    this.formGroup.controls.contactEmail.setValue("");
    this.formGroup.controls.limitUser.setValue(null);
    this.formGroup.controls.limitTryPassword.setValue(null);
    this.formGroup.controls.limitRepeatPassword.setValue(null);
    this.formGroup.controls.passwordExpireDays.setValue(null);
    this.formGroup.controls.limitSessionInSec.setValue(null);
    this.formGroup.controls.idleSessionInSec.setValue(null);
    if (this.configuration.COMPANY_CHECK_VAT_CORPORATION == 0) {
      this.formGroup.controls.houseNo.setValue("");
      this.formGroup.controls.moo.setValue("");
      this.formGroup.controls.building.setValue("");
      this.formGroup.controls.soi.setValue("");
      this.formGroup.controls.street.setValue("");
      this.formGroup.controls.subDistrictCode.setValue("");
      this.formGroup.controls.subDistrictName.setValue("");
      this.formGroup.controls.districtCode.setValue("");
      this.formGroup.controls.districtName.setValue("");
      this.formGroup.controls.provinceCode.setValue("");
      this.formGroup.controls.provinceName.setValue("");
      this.formGroup.controls.postCode.setValue("");
    }
  }
  getCompanyTypeByRegisterType(registerType: number | null) {
    this.fetchDataService.getCompanyTypeByRegisterType(registerType).subscribe({
      next: (res) => {
        this.responseItemsCompanyType = res.data ? res.data : [];
        this.inputInformationConfig
          .filter((p) => p.formControlName == "companyTypeId")
          .map((map) => {
            map.options = this.responseItemsCompanyType.map((companyType) => this.mapToCompanyTypeList(companyType));
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  async next() {
    const expression = new RegExp("^[0-9]+$");
    if (!this.formGroup.controls.registerType.value) {
      this.alertService.alertDefaultError(this.i18n.alert.selectType);
    } else if (!this.formGroup.controls.companyTaxId.value) {
      this.alertService.alertDefaultError(this.i18n.alert.taxIdRequired);
    } else if (this.formGroup.controls.companyTaxId.value.length < 13) {
      this.alertService.alertDefaultError(this.i18n.alert.taxIdLength);
    } else if (!expression.test(this.formGroup.controls.companyTaxId.value)) {
      this.alertService.alertDefaultError(this.i18n.alert.taxIdPattern);
    } else {
      if (this.configuration.COMPANY_CHECK_VAT_CORPORATION == 1) {
        await this.checkVatCorporation();
      }
      this.step = 2;
      this.typeChange();
    }
  }

  checkVatCorporation() {
    return new Promise<any>((resolve) => {
      const params: CheckVatCorporation = {
        companyTaxId: this.formGroup.controls.companyTaxId.value,
      };
      this.registerService.checkVatCorporation(params).subscribe({
        next: (res) => {
          this.formGroup.controls.name.setValue(res.data.companyName);
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
          resolve(null);
        },
        error: (err) => {
          console.log(err);
          resolve(null);
        },
      });
    });
  }

  back() {
    this.step = 1;
    this.selectedType = false;
  }

  insertInput(input: StandardFormCardInputConfig[], index: number, element: StandardFormCardInputConfig) {
    input.splice(index, 0, element);
  }
  removeInput(input: StandardFormCardInputConfig[], index: number) {
    return input.splice(index, 1);
  }

  getSubDistrict(subDistrictName: string) {
    return new Promise((resolve) => {
      this.subDistrictService.searchSubDistrict(1, 10, subDistrictName).subscribe({
        next: (res) => {
          this.responseItemSubDistrict = (res && res.data.data) || [];

          resolve(null);
        },
        error: (err) => {
          console.log(err);
          resolve(null);
        },
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
    placeholder: "Sub District",
    maxlength: 255,
  });
  changeUserLimit(checked: boolean) {
    this.formGroup.controls.limitUser.setValue(checked ? -1 : null);
  }
  changeTryPasswordLimit(checked: boolean) {
    this.formGroup.controls.limitTryPassword.setValue(checked ? -1 : null);
  }
  changeRepeatPasswordLimit(checked: boolean) {
    this.formGroup.controls.limitRepeatPassword.setValue(checked ? -1 : null);
  }

  changePasswordExpireDaysLimit(checked: boolean) {
    this.formGroup.controls.passwordExpireDays.setValue(checked ? -1 : null);
    this.formGroup.controls.passwordExpireDays.setValue(checked ? -1 : null);
  }

  save(): void {
    let number: number = 0;
    this.isSubmit = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    } else {
      const limitUser: number | null = this.formGroup.controls.limitUser.value;
      const limitTryPassword: number | null = this.formGroup.controls.limitTryPassword.value;
      const limitRepeatPassword: number | null = this.formGroup.controls.limitRepeatPassword.value;
      const passwordExpireDays: number | null = this.formGroup.controls.passwordExpireDays.value;
      const limitSessionInSec: number | null = this.formGroup.controls.limitSessionInSec.value;
      const idleSessionInSec: number | null = this.formGroup.controls.idleSessionInSec.value;

      if (limitUser == 0) {
        this.alertService.alertDefaultError(this.i18n.alert.limitUserNotEqualZero);
        return;
      }
      if (limitUser !== null && limitUser < -1) {
        this.alertService.alertDefaultError(this.i18n.alert.limitUserNotLessThanMinusOne);
        return;
      }
      if (limitTryPassword == 0) {
        this.alertService.alertDefaultError(this.i18n.alert.limitLoginNotEqualZero);
        return;
      }
      if (limitTryPassword !== null && limitTryPassword < -1) {
        this.alertService.alertDefaultError(this.i18n.alert.limitLoginNotLessThanMinusOne);
        return;
      }
      if (limitRepeatPassword == 0) {
        this.alertService.alertDefaultError(this.i18n.alert.limitRepeatPasswordNotZero);
        return;
      }
      if (limitRepeatPassword !== null && limitRepeatPassword < -1) {
        this.alertService.alertDefaultError(this.i18n.alert.limitRepeatPasswordNotLessThanMinusOne);
        return;
      }
      if (passwordExpireDays == 0) {
        this.alertService.alertDefaultError(this.i18n.alert.passwordExpireNotEqualZero);
        return;
      }
      if (passwordExpireDays !== null && passwordExpireDays < -1) {
        this.alertService.alertDefaultError(this.i18n.alert.passwordExpireNotLessThanMinusOne);
        return;
      }
      if (limitSessionInSec !== null && limitSessionInSec <= 0) {
        this.alertService.alertDefaultError(this.i18n.alert.limitLoginSessionNotLessThanOrEqualZero);
        return;
      }
      if (idleSessionInSec !== null && idleSessionInSec <= 0) {
        this.alertService.alertDefaultError(this.i18n.alert.sessionExpireNotLessThanOrEqualZero);
        return;
      }
      if (this.pageType === "add") {
        this.processCreateCompany(this.company);
      } else if (this.pageType === "edit") {
        this.processUpdateCompany(this.company);
      }
    }
  }
  async processCreateCompany(company: ICompany) {
    const value: string | null = company.name != null ? company.name : "";
    const isDuplicate = await this.checkDuplicateCompany(value);

    if (isDuplicate) {
      this.alertService.alertDefaultError(this.i18n.alert.duplicatedCompanyName).then((result) => {
        this.eventonClosed();
      });
      return;
    }

    this.isLoading = true;
    this.fetchDataService.createCompany_V2(this.setDatasourceV2ForSaveCompany()).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.company.alertMessageCreateSuccess).then((result) => {
            this.eventonClosed();
          });
        } else {
          if (res.code == "DUPLICATE_CODE") {
            if (res.message == `Duplicate ${this.fieldRegisterTypeName} Tax ID.`) {
              this.alertService.alertDefaultError(this.i18n.alert.duplicatedCompanyTaxId);
              return;
            } else {
              if (this.fieldRegisterTypeName == "Company") {
                this.alertService.alertDefaultError(this.i18n.alert.duplicatedCompanyName);
                return;
              }
              this.alertService.alertDefaultError(this.i18n.alert.duplicatedPersonalName);
              return;
            }
          }
          this.alertService.alertDefaultError(res.message);
          return;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.alertService.alertDefaultError(err.message);
        return;
      },
    });
  }

  processUpdateCompany(company: ICompany) {
    this.isLoading = true;
    this.fetchDataService.updateCompany_V2(this.setDatasourceV2ForSaveCompany()).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.company.alertMessageUpdateSuccess).then((result) => {
            this.eventonClosed();
          });
        } else {
          if (res.code == "DUPLICATE_CODE") {
            if (res.message == `Duplicate ${this.fieldRegisterTypeName} Tax ID.`) {
              this.alertService.alertDefaultError(this.i18n.alert.duplicatedCompanyTaxId);
              return;
            }
          }
          this.alertService.alertDefaultError(res.message);
          return;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.alertService.alertDefaultError(err.message);
        return;
      },
    });
  }
  async checkDuplicateCompany(name: string) {
    return new Promise((resolve) => {
      this.fetchDataService.checkDuplicateCompanyName(name).subscribe({
        next: (res) => {
          const isDuplicate: boolean = res && res.data && res.data.duplicate;
          resolve(isDuplicate);
        },
        error: (err) => {
          console.log(err);
          this.alertService.alertDefaultError(this.i18n.alert.cannotCheckDuplicatedCompany).then((result) => {
            this.eventonClosed();
          });
          resolve(true);
        },
      });
    });
  }
  eventonClosed() {
    super.onClosed();
  }
  setDatasourceV2ForSaveCompany() {
    const params = {
      header: {
        cpid: this.cpid,
        name: this.formGroup.controls.name.value,
        companyTypeId: this.formGroup.controls.companyTypeId.value,
        limitTryPassword: this.formGroup.controls.limitTryPassword.value,
        limitUser: this.formGroup.controls.limitUser.value,
        passwordExpireDays: this.formGroup.controls.passwordExpireDays.value,
        limitRepeatPassword: this.formGroup.controls.limitRepeatPassword.value,
        idleSessionInSec: this.formGroup.controls.idleSessionInSec.value,
        limitSessionInSec: this.formGroup.controls.limitSessionInSec.value,
      },
      detail: {
        id: this.companiesInformationId,
        cpid: this.cpid,
        registerType: this.formGroup.controls.registerType.value,
        companyTaxId: this.formGroup.controls.companyTaxId.value,
        companyBranch: this.formGroup.controls.companyBranch.value,
        houseNo: this.formGroup.controls.houseNo.value,
        moo: this.formGroup.controls.moo.value,
        building: this.formGroup.controls.building.value,
        soi: this.formGroup.controls.soi.value,
        street: this.formGroup.controls.street.value,
        subDistrictCode: this.formGroup.controls.subDistrictCode.value,
        subDistrictName: this.formGroup.controls.subDistrictName.value,
        districtCode: this.formGroup.controls.districtCode.value,
        districtName: this.formGroup.controls.districtName.value,
        provinceCode: this.formGroup.controls.provinceCode.value,
        provinceName: this.formGroup.controls.provinceName.value,
        postCode: this.formGroup.controls.postCode.value,
        companyPhone: this.formGroup.controls.companyPhone.value,
        companyEmail: this.formGroup.controls.companyEmail.value,
        contactName: this.formGroup.controls.contactName.value,
        contactLastName: this.formGroup.controls.contactLastName.value,
        contactPhone: this.formGroup.controls.contactPhone.value,
        contactEmail: this.formGroup.controls.contactEmail.value,
      },
    };
    return params;
  }
  getCompanyDetail(cpid: string | null) {
    return new Promise((resolve) => {
      this.isLoading = true;
      this.fetchDataService.getCompany_V2(cpid).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.getRegisterTypeList();
          this.company = res.data.header ? res.data.header : {};
          if (res.data.detail) {
            this.companiesInformationId = res.data.detail.id;
            this.companyTypeId =
              this.company.companyTypeId == null || this.company.companyTypeId == undefined
                ? null
                : this.company.companyTypeId.toString();
            this.formGroup.controls.registerType.setValue(res.data.detail.registerType.toString());
            this.formGroup.controls.companyTypeId.setValue(this.companyTypeId);
            this.formGroup.controls.companyTaxId.setValue(res.data.detail.companyTaxId);
            this.formGroup.controls.companyBranch.setValue(res.data.detail.companyBranch);
            this.formGroup.controls.houseNo.setValue(res.data.detail.houseNo);
            this.formGroup.controls.moo.setValue(res.data.detail.moo);
            this.formGroup.controls.building.setValue(res.data.detail.building);
            this.formGroup.controls.soi.setValue(res.data.detail.soi);
            this.formGroup.controls.street.setValue(res.data.detail.street);
            this.formGroup.controls.subDistrictCode.setValue(res.data.detail.subDistrictCode);
            this.formGroup.controls.subDistrictName.setValue(res.data.detail.subDistrictName);
            this.formGroup.controls.districtCode.setValue(res.data.detail.districtCode);
            this.formGroup.controls.districtName.setValue(res.data.detail.districtName);
            this.formGroup.controls.provinceCode.setValue(res.data.detail.provinceCode);
            this.formGroup.controls.provinceName.setValue(res.data.detail.provinceName);
            this.formGroup.controls.postCode.setValue(res.data.detail.postCode);
            this.formGroup.controls.companyPhone.setValue(res.data.detail.companyPhone);
            this.formGroup.controls.companyEmail.setValue(res.data.detail.companyEmail);
            this.formGroup.controls.contactName.setValue(res.data.detail.contactName);
            this.formGroup.controls.contactLastName.setValue(res.data.detail.contactLastName);
            this.formGroup.controls.contactPhone.setValue(res.data.detail.contactPhone);
            this.formGroup.controls.contactEmail.setValue(res.data.detail.contactEmail);
            if (this.company.idleSessionInSec != null) {
              const idle: number = this.company.idleSessionInSec;
              this.company.idleSessionInSec = this.changeSecToMin(idle);
            }
            if (this.company.limitSessionInSec != null) {
              const limitSessionInSec: number = this.company.limitSessionInSec;
              this.company.limitSessionInSec = this.changeSecToMin(limitSessionInSec);
            }
          }
          this.getCompanyType();
          this.patchFormControls(this.company as unknown as ICompany_V2);
          this.formGroup.updateValueAndValidity();
          resolve(this.formGroup.getRawValue());
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          resolve(null);
        },
      });
    });
  }
  changeSecToMin(sec: number) {
    return sec / 60;
  }

  override async fetchData() {
    this.route.paramMap.subscribe((params) => {
      this.cpid = params.get("id");
    });
    this.getRegisterTypeList();

    await this.getCompanyDetail(this.cpid);
    this.formGroup.controls.companyTypeId.setValue(this.companyTypeId);
    if (this.formGroup.controls.registerType.value == 1) {
      this.fieldRegisterTypeName = "Company";
    } else {
      this.fieldRegisterTypeName = "Personal";
      this.formGroup.controls.companyBranch.setValidators([]);
      this.formGroup.controls.companyBranch.updateValueAndValidity();
    }
  }

  isEditCompanyData() {
    if (!this.permission.checkIsSystemAdmin()) {
      this.formGroup.controls.companyTypeId.disable();
      return true;
    }
    return false;
  }
}
