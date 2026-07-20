import { Component, inject } from '@angular/core';
import { CompanySearchForm, ICompany, ICompany_V2, SearchCompany } from '../../models/standard-company.model';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { AlertService } from '../../../../core/services/alert.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { StandardInputComponent } from '../../../../shared/components/standard-input/standard-input.component';
import { StandardShowingPageComponent } from '../../../../shared/components/standard-showing-page/standard-showing-page.component';
import { StandardCompanyTypeService } from '../../../standard-company-type/services/standard-company-type.service';
import { ICompanyType } from '../../../standard-company-type/models/standard-company-type.model';
import { lastValueFrom } from 'rxjs';
import { StandardRegisterManagementService } from '../../../standard-register-management/services/standard-register-management.service';
import { RegisterType, SearchRegisterType } from '../../../standard-register-management/models/standard-register-management.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardCompanyService } from "../../services/standard-company.service";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { i18n } from '../../../../shared/models/standard-i18n.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-standard-company-list',
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
    NzDividerModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-company-list.component.html',
  styleUrl: './standard-company-list.component.scss'
})
export class StandardCompanyListComponent extends StandardTrackingComponent<SearchCompany,ICompany_V2>{

  public override fetchDataService: StandardCompanyService = inject(StandardCompanyService);
  public override pageTitle: string = "Company";
  public override searchForm: FormGroup<CompanySearchForm>;
  public override criteriaSearch: SearchCompany = new SearchCompany();
  public override responseItems: ICompany_V2[] | undefined;
  public override key: string = "cpid";
  public override absoluteUrl: string;

  public responseItemsCompanyType: ICompanyType[] = [];
  public _registerType: RegisterType[] = [];
  public  swalConfigs: any = {
    showDenyButton:false,
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No"
  };

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "cmnc-company-type",
      name: "cmnc-company-type",
      formControlName: "companyType",
      label:"pages.company.list.select.companyTypeId.label",
      sublabel: "pages.company.list.select.companyTypeId.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "cmnc-company-name",
      name: "cmnc-company-name",
      formControlName: "name",
      label: "pages.company.list.input.name.label",
      sublabel: "pages.company.list.input.name.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
  ]

  constructor(public location: Location,
    public router: Router,
    public permission: StandardAppPermissionService,
    private companyService: StandardCompanyService,
    private companyTypeService:StandardCompanyTypeService,
    private registerService: StandardRegisterManagementService,
    private fb: FormBuilder,
    private alertService: AlertService) {
      super();
      this.absoluteUrl = this.location.path(true);
      this.searchForm = this.fb.group<CompanySearchForm>({
        companyType: this.fb.control(null),
        name: this.fb.control(null)
      })
  }
   override async ngOnInit(): Promise<void> {
    await this.getRegisterTypeList();
    this.getCompanyType();
    super.ngOnInit();
  }

  getCompanyType() {
    this.companyTypeService.getCompanyType().subscribe({
        next : (res) => {
          this.responseItemsCompanyType = (res && res.data) || [];
          this.inputConfig.filter(p => p.formControlName == "companyType").map(map => {
            map.options = this.responseItemsCompanyType.map(companyType => this.mapToCompanyTypeList(companyType))
          })
        },
        error : (err) => {
          console.log(err.message);
        }
      });
  }
  mapToCompanyTypeList(item: ICompanyType) {
    return { value: String(item.id), label: item.name };
  }

  getRegisterTypeList() {
    const params: SearchRegisterType = {
       code: null
    };

    return lastValueFrom(
      this.registerService.getRegisterTypeList(params)).then(res => {
        this._registerType = res.data ?? [];
      }
    );
  }

  public findRegisterType(registerType: number| null) {
    if (registerType && this._registerType.length > 0) {
      return this._registerType.find(x => x.code == registerType)?.nameTh ?? "";
    }
    return "";
  }
  eventOnUpdateStatus(data:ICompany_V2){
    this.alertService.alertMessageOption(
      {
        title: super.translate(this.i18n.alert.titleWarning),
        text: super.translate(this.i18n.company.companyChangeStatus),
        type: "warning",
        ...this.swalConfigs}).then((result) => {
      if (result.value) {
        let company = new ICompany();
        company.setValue(data);
        company.isActive = !data.isActive;
        this.companyService.updateStatus(company).subscribe({
          next: (res) => {
            if (res && res.status.toLowerCase() === "success") {
              this.alertService.alertDefaultSuccess(this.i18n.company.dataUpdateStatus).then(
                (result) => {
                  this.eventOnSearch();
                }
              );
            } else if (res && res.status.toLowerCase() === "fail") {
              this.alertService.alertDefaultError(res.message);
            } else {
              this.alertService.alertDefaultError(this.i18n.company.dataUpdateStatusFailed);
            }
          },
          error: (err) => {
            console.log(err);
            this.alertService.alertDefaultError(this.i18n.company.dataUpdateStatusFailed);
          }
        });
      }
    });
  }
}
