import { CommonModule,Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
import { IRole, RoleSearch } from '../../models/standard-role.model';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { StandardRoleService } from '../../services/standard-role.service';
import { ICompany, SearchCompany } from '../../../standard-company/models/standard-company.model';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { AlertService } from '../../../../core/services/alert.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';

export type RoleSearchForm = {
  id: FormControl<string | null>;
  cpid: FormControl<string | null>;
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-standard-role-list',
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
  templateUrl: './standard-role-list.component.html',
  styleUrl: './standard-role-list.component.scss'
})
export class StandardRoleListComponent extends StandardTrackingComponent<RoleSearch, IRole> {
  public override fetchDataService: StandardRoleService = inject(StandardRoleService);
  public override pageTitle: string = this.i18n.role.pageTitle;
  public searchForm: FormGroup<RoleSearchForm>;
  public override criteriaSearch: RoleSearch = new RoleSearch();
  public override responseItems: IRole[] | undefined;
  public override key: string = "id";
  public override absoluteUrl: string;
  public responseItemsCompany: ICompany[] = [];
  public colSpan: number = 20;

  private searchCompany: SearchCompany = new SearchCompany();
  public  swalConfigs: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };

  public inputAdminConfig: StandardFormCardInputConfig[] = [
    {
      id: "rmnl-search-cpid",
      name: "rmnl-search-cpid",
      formControlName: "cpid",
      label: "pages.role.select.cpid.label",
      sublabel: "pages.role.select.cpid.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search",
    },
    {
      id: "rmnl-search-name",
      name: "rmnl-search-name",
      formControlName: "name",
      label: "pages.role.input.name.label",
      sublabel: "pages.role.input.name.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
  ]

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "rmnl-search-name",
      name: "rmnl-search-name",
      formControlName: "name",
      label: "pages.role.input.name.label",
      sublabel: "pages.role.input.name.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
  ]

  constructor(
    private fb: FormBuilder,
    public location: Location,
    public companyService:StandardCompanyService,
    private alertService: AlertService,
    public router: Router,
    public permission: StandardAppPermissionService,
  ){
    super();
    this.absoluteUrl = this.location.path(true);
    this.searchForm =this.fb.group<RoleSearchForm>({
      id: this.fb.control(null),
      cpid: this.fb.control(null),
      name: this.fb.control(null),
    })

  }

  override async ngOnInit(): Promise<void> {
    if(this.permission.checkIsSystemAdmin()){
      this.colSpan = 8;
      await this.getCompanyList(this.searchCompany);
    }
    super.ngOnInit();
  }

  getCompanyList(search: SearchCompany) {
    this.companyService
      .getListCompany(1, 999999, search)
      .subscribe({
        next: (res) => {
          this.responseItemsCompany = (res && res.data && res.data.data) || [];
          this.inputAdminConfig.filter(e => e.formControlName == "cpid").map(map =>{
            map.options = this.responseItemsCompany.map(company => this.mapToCompanyList(company))
          })
        },
        error: (err) => {
        }
      });
  }
  mapToCompanyList(item: ICompany) {
    return { value: item.cpid, label: item.name };
  }

}
