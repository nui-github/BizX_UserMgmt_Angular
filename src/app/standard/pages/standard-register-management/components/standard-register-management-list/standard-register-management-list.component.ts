import { CommonModule,Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardInputComponent } from '../../../../shared/components/standard-input/standard-input.component';
import { StandardShowingPageComponent } from '../../../../shared/components/standard-showing-page/standard-showing-page.component';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { Register, RegisterType, SearchRegister, SearchRegisterType } from '../../models/standard-register-management.model';
import { StandardRegisterManagementService } from '../../services/standard-register-management.service';
import { IPaginationResponse } from '../../../../shared/models/response.model';
import { AlertService } from '../../../../core/services/alert.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardConfGlobalService } from '../../../../core/services/standard-conf-global.service';
import { ICompany, SearchCompany } from '../../../standard-company/models/standard-company.model';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { MasterStatusService } from '../../services/masterstatus.service';
import { Status } from '../../models/status.model';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';
import moment from "moment-timezone";

export type RegisterSearchForm = {
  registerType: FormControl<number | null>;
  companyTaxId: FormControl<string | null>;
  companyName: FormControl<string | null>;
  companyBranch: FormControl<string | null>;
  status: FormControl<number | null>;
  createDateFrom: FormControl<string | null>;
  createDateTo: FormControl<string | null>;
  approveDateFrom: FormControl<string | null>;
  approveDateTo: FormControl<string | null>;
}

@Component({
  selector: 'app-standard-register-management-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    StandardInputComponent,
    PaginationComponent,
    StandardShowingPageComponent,
    NzIconModule,
    NzFormModule,
    NzDropDownModule,
    NzSelectModule,
    NzFlexModule,
    NzListModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-register-management-list.component.html',
  styleUrl: './standard-register-management-list.component.scss'
})
export class StandardRegisterManagementListComponent extends StandardTrackingComponent<SearchRegister,Register>{
  public override fetchDataService: StandardRegisterManagementService = inject(StandardRegisterManagementService)
  public override pageTitle: string = this.i18n.register.pageTitle;
  public searchForm: FormGroup<RegisterSearchForm>;
  public override criteriaSearch: SearchRegister = new SearchRegister();
  public override responseItems: Register[] | undefined;
  public _registerType: RegisterType[] = [];
  public override key: string = "id";
  public override absoluteUrl: string;
  public responseItemsCompany: ICompany[] = [];
  private searchCompany: SearchCompany = new SearchCompany();
  public configuration: any = {};
  public  swalConfigs: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };
  _status: Status[]=[];
  criteriacriteriaSearch: any;
  constructor(private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public permission: StandardAppPermissionService,
    public location: Location,
    public companyService:StandardCompanyService,
    private alertService: AlertService,
    private masterStatusService: MasterStatusService,
    private confGlobalService: StandardConfGlobalService,
  ) {
    super();
    this.absoluteUrl = this.location.path(true);

    this.searchForm = this.fb.group<RegisterSearchForm>({
      registerType: this.fb.control(null),
      companyTaxId: this.fb.control(null),
      companyName: this.fb.control(null),
      companyBranch: this.fb.control(null),
      createDateFrom: this.fb.control(null),
      createDateTo: this.fb.control(null),
      approveDateFrom: this.fb.control(null),
      approveDateTo: this.fb.control(null),
      status: this.fb.control(null),
    })

  }

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "rmnl-search-register-type",
      name: "rmnl-search-register-type",
      formControlName: "registerType",
      label: "pages.regsiter.list.select.registerType.label",
      sublabel: "pages.regsiter.list.select.registerType.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "rmnl-search-register-company-tax-id",
      name: "rmnl-search-register-company-tax-id",
      formControlName: "companyTaxId",
      label: "pages.regsiter.list.input.companyTaxId.label",
      sublabel: "pages.regsiter.list.input.companyTaxId.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "rmnl-search-register-company-name",
      name: "rmnl-search-register-company-name",
      formControlName: "companyName",
      label: "pages.regsiter.list.input.companyName.label",
      sublabel: "pages.regsiter.list.input.companyName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "rmnl-search-register-company-branch",
      name: "rmnl-search-register-company-branch",
      formControlName: "companyBranch",
      label: "pages.regsiter.list.input.companyBranch.label",
      sublabel: "pages.regsiter.list.input.companyBranch.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "rmnl-search-register-createdate-from",
      name: "rmnl-search-register-createdate-from",
      formControlName: "createDateFrom",
      label: "pages.regsiter.list.date.createDateFrom.label",
      sublabel: "pages.regsiter.list.date.createDateFrom.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-createdate-to",
      name: "rmnl-search-register-createdate-to",
      formControlName: "createDateTo",
      label: "pages.regsiter.list.date.createDateTo.label",
      sublabel: "pages.regsiter.list.date.createDateTo.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-status",
      name: "rmnl-search-register-status",
      formControlName: "status",
      label: "pages.regsiter.list.select.status.label",
      sublabel: "pages.regsiter.list.select.status.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-aprrovedate-from",
      name: "rmnl-search-register-aprrovedate-from",
      formControlName: "approveDateFrom",
      label: "pages.regsiter.list.date.approveDateFrom.label",
      sublabel: "pages.regsiter.list.date.approveDateFrom.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "From",
    },
    {
      id: "rmnl-search-register-aprrovedate-to",
      name: "rmnl-search-register-aprrovedate-to",
      formControlName: "approveDateTo",
      label: "pages.regsiter.list.date.approveDateTo.label",
      sublabel: "pages.regsiter.list.date.approveDateTo.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "To",
    },
  ]
  public inputOtherConfig: StandardFormCardInputConfig[] = [
    {
      id: "rmnl-search-register-type",
      name: "rmnl-search-register-type",
      formControlName: "registerType",
      label: "pages.regsiter.list.select.registerType.label",
      sublabel: "pages.regsiter.list.select.registerType.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-company-tax-id",
      name: "rmnl-search-register-company-tax-id",
      formControlName: "companyTaxId",
      label: "pages.regsiter.list.input.companyTaxId.label",
      sublabel: "pages.regsiter.list.input.companyTaxId.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "rmnl-search-register-company-name",
      name: "rmnl-search-register-company-name",
      formControlName: "companyName",
      label: "pages.regsiter.list.input.companyName.label",
      sublabel: "pages.regsiter.list.input.companyName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "rmnl-search-register-status",
      name: "rmnl-search-register-status",
      formControlName: "status",
      label: "pages.regsiter.list.select.status.label",
      sublabel: "pages.regsiter.list.select.status.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-createdate-from",
      name: "rmnl-search-register-createdate-from",
      formControlName: "createDateFrom",
      label: "pages.regsiter.list.date.createDateFrom.label",
      sublabel: "pages.regsiter.list.date.createDateFrom.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-createdate-to",
      name: "rmnl-search-register-createdate-to",
      formControlName: "createDateTo",
      label: "pages.regsiter.list.date.createDateTo.label",
      sublabel: "pages.regsiter.list.date.createDateTo.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-aprrovedate-from",
      name: "rmnl-search-register-aprrovedate-from",
      formControlName: "approveDateFrom",
      label: "pages.regsiter.list.date.approveDateFrom.label",
      sublabel: "pages.regsiter.list.date.approveDateFrom.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-register-aprrovedate-to",
      name: "rmnl-search-register-aprrovedate-to",
      formControlName: "approveDateTo",
      label: "pages.regsiter.list.date.approveDateTo.label",
      sublabel: "pages.regsiter.list.date.approveDateTo.sublabel",
      type: 'date',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },

  ]
   override async ngOnInit(): Promise<void> {
    await this.getStatus("REGISTER");
    this.configuration = await this.getAllConfig();
    await this.getRegisterTypeList();
    super.ngOnInit();
  }
  getAllConfig() {
    return new Promise((resolve) => {
      this.isLoading = true;
      this.confGlobalService.getAllConfig().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.configuration = res.data ? res.data : {};
          resolve(this.configuration);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          resolve(null);
        }
      });
    });
  }
  getRegisterTypeList() {
    const params: SearchRegisterType = {
      code: null
    };
    this.fetchDataService.getRegisterTypeList(params).subscribe({
      next: (res) => {
        this._registerType = res.data ? res.data : [];
        this.inputConfig.filter(p => p.formControlName == "registerType").map(map => {
          map.options = this._registerType.map(register => this.mapToRegisterTypeList(register))
        })
        this.inputOtherConfig.filter(p => p.formControlName == "registerType").map(map => {
          map.options = this._registerType.map(register => this.mapToRegisterTypeList(register))
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  mapToRegisterTypeList(item: RegisterType) {
    return { value: String(item.id), label: item.nameTh };
  }
  getStatus(type: string) {
    return new Promise((resolve) => {
      this.isLoading = true;
      this.masterStatusService
        .getMasterStatus(type)
        .subscribe({
          next: (res: { data: any; }) => {
            this.isLoading = false;
            this._status = res.data;
            this.inputConfig.filter(p => p.formControlName == "status").map(map => {
              map.options = this._status.map(status => this.mapToStatusList(status))
            })
            this.inputOtherConfig.filter(p => p.formControlName == "status").map(map => {
              map.options = this._status.map(status => this.mapToStatusList(status))
            })
            resolve(null);
          },
          error: (err: any) => {
            this.isLoading = false;
            console.log(err);
            resolve(null);
          }
        });
    });
  }
  mapToStatusList(item: Status) {
    return { value: String(item.id), label: item.nameEn };
  }
   findRegisterType(registerType: number| null) {
    if (registerType !== null && this._registerType != null && this._registerType.length > 0) {
      // const registerTypeParsed = parseInt(registerType);
      const foundItem = this._registerType.find(x => x["code"] == registerType);
      return foundItem?.nameTh ?? "";
    }
    return "";
  }
  public findStatusName(statusId: number| null) {
    if (statusId !== null) {
      const foundItem = this._status.find(x => x["code"] == statusId);
      return foundItem?.nameEn ?? "";
    }
    return "";
  }

  public findStatusBorderColor(statusId: number| null) {
    if (statusId !== null) {
      const foundItem = this._status.find(x => x["code"] == statusId);
      return foundItem?.borderColor ?? "";
    }
    return "";
  }

  public findStatusBackgroundColor(statusId: number| null) {
    if (statusId !== null) {
      const foundItem = this._status.find(x => x["code"] == statusId);
      return foundItem?.backgroundColor ?? "";
    }
    return "";
  }

  public findStatusTextColor(statusId: number| null) {
    if (statusId !== null) {
      const foundItem = this._status.find(x => x["code"] == statusId);
      return foundItem?.textColor ?? "";
    }
    return "";
  }

  // processResendEmail(registerId: string) {
  //   Swal.fire({
  //     title: "",
  //     html: "Please wait ..",
  //     allowOutsideClick: false,
  //     onBeforeOpen: () => {
  //         Swal.showLoading();
  //         this._processResendEmail(registerId);
  //     },
  //   });
  // }
  processResendEmail(registerId: string | null) {
    this.fetchDataService.resendEmailRegister(registerId).subscribe({
      next: (res) => {
        // Swal.close();
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.alertService.alertDefaultSuccess(this.i18n.register.resendEmailSuccess);
        } else {
          this.alertService.alertDefaultError(this.i18n.register.resendEmailFailed);
        }
      },
      error: (err) => {
        this.alertService.alertDefaultError(this.i18n.register.resendEmailFailed);
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  search(){
    this.criteriaSearch.createDateFrom = this.criteriaSearch.createDateFrom ? moment(this.criteriaSearch.createDateFrom).startOf("day").toISOString(true) : null;
    this.criteriaSearch.createDateTo = this.criteriaSearch.createDateTo ? moment(this.criteriaSearch.createDateTo).endOf("day").toISOString(true) : null;
    this.criteriaSearch.approveDateFrom = this.criteriaSearch.approveDateFrom ? moment(this.criteriaSearch.approveDateFrom).startOf("day").toISOString(true) : null;
    this.criteriaSearch.approveDateTo = this.criteriaSearch.approveDateTo ? moment(this.criteriaSearch.approveDateTo).endOf("day").toISOString(true) : null;
    super.eventOnSearch();
  }

}


