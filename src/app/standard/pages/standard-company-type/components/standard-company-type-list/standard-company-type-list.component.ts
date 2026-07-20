import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { StandardShowingPageComponent } from '../../../../shared/components/standard-showing-page/standard-showing-page.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzListModule } from 'ng-zorro-antd/list';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { CompanyTypeSearch, ICompanyType, RegisterType } from '../../models/standard-company-type.model';
import { StandardCrudService } from '../../../../shared/abstracts/services/standard-crud.service';
import { StandardCompanyTypeService } from '../../services/standard-company-type.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { i18n } from '../../../../shared/models/standard-i18n.model';
import { TranslateModule } from '@ngx-translate/core';

export type CompanyTypeSearchForm = {
  name : FormControl<string | null>
  registerType: FormControl<string | null>
}

@Component({
  selector: 'app-standard-company-type-list',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    PaginationComponent,
    StandardShowingPageComponent,
    NzIconModule,
    NzFormModule,
    NzDropDownModule,
    NzFlexModule,
    NzListModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-company-type-list.component.html',
  styleUrl: './standard-company-type-list.component.scss'
})
export class StandardCompanyTypeListComponent extends StandardTrackingComponent<CompanyTypeSearch, any> {
  public override fetchDataService: StandardCompanyTypeService = inject(StandardCompanyTypeService)
  public override pageTitle: string = this.i18n.companyType.pageTitle;
  public override criteriaSearch: CompanyTypeSearch = new CompanyTypeSearch();
  public override responseItems: ICompanyType[] | undefined;
  public override key: string = "id";
  public override absoluteUrl: string;

  public registerType: RegisterType[] = [];
  public searchForm: FormGroup<CompanyTypeSearchForm>

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "mmnc-company-type-name",
      name: "mmnc-company-type-name",
      formControlName: "name",
      label: "page.company.type.name.label",
      sublabel: "page.company.type.name.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "mmnc-company-type-register-type",
      name: "mmnc-company-type-register-type",
      formControlName: "registerType",
      label: "page.company.type.register.type.label",
      sublabel: "page.company.type.register.type.sublabel",
      type: 'select',
      showInput: true,
    }
  ]

  constructor(
    private fb: FormBuilder,
    public override router: Router,
    private activatedRoute: ActivatedRoute,
    private companyType: StandardCompanyTypeService,
    private location : Location,
    public permission: StandardAppPermissionService
  ) {
    super();
    this.absoluteUrl = this.location.path(true);

    this.searchForm = this.fb.group<CompanyTypeSearchForm>({
      name : this.fb.control(null),
      registerType: this.fb.control(null)
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAllRegisterType();
  }

  override eventOnDelete(model: any, confirmText?: string): Promise<void> {
    return new Promise(resolve => resolve());
  }

  getRegisterTypeName(code : number | null): RegisterType | null {
    return this.registerType.find(e => e?.code === code) ?? null;
  }

  getAllRegisterType() {
    this.fetchDataService.getAllRegisterType()
    .subscribe({
      next: (res) => {
        if (res.status.toLocaleLowerCase() === "success") {
          this.registerType = res.data;
          this.inputConfig
            .filter(p => p.formControlName === 'registerType')
            .map(config => {
              config.options = this.registerType.map(registerType => this.mapRegisterTypeList(registerType));
            });
        }
      },
      error: (err) => {
        console.error(err);
        this.registerType = [];
      }
    })
  }

  mapRegisterTypeList(item: RegisterType): { label: string | null; value: string | null } {
    return {
      label: item.nameTh,
      value: item.id ? item.id.toString() : null
    };
  }
}
