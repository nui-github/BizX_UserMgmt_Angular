import { CommonModule, Location } from '@angular/common';
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
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { IGroup, StandardGroup } from '../../models/standard-group.model';
import { StandardGroupService } from '../../services/standard-group.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardCompanyService } from '../../../standard-company/services/standard-company.service';
import { AlertService } from '../../../../core/services/alert.service';
import { ICompany, SearchCompany } from '../../../standard-company/models/standard-company.model';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';

export type GroupSearchForm = {
  cpid: FormControl<string | null>;
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-standard-group-list',
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
  templateUrl: './standard-group-list.component.html',
  styleUrl: './standard-group-list.component.scss'
})
export class StandardGroupListComponent extends StandardTrackingComponent<StandardGroup,StandardGroup>{
  public searchForm: FormGroup<GroupSearchForm>;
  public override criteriaSearch: StandardGroup  = new StandardGroup();
  public override responseItems: StandardGroup[] | undefined;
  public override key: string = "gid";
  public override absoluteUrl: string;
  public override fetchDataService: StandardGroupService = inject(StandardGroupService);
  public override pageTitle: string = this.i18n.group.pageTitle;

  private searchCompany: SearchCompany = new SearchCompany();
  public responseItemsCompany: ICompany[] = [];

  public  swalConfigs: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "gmnl-search-keyword",
      name: "gmnl-search-keyword",
      formControlName: "cpid",
      label: "pages.group.select.cpid.label",
      sublabel: "pages.group.select.cpid.sublabel",
      type: 'select',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
    {
      id: "usgmnlr-search-keyword",
      name: "gmnl-search-keyword",
      formControlName: "name",
      label: "pages.group.input.name.label",
      sublabel: "pages.group.input.name.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    },
  ]

  constructor(
    private fb: FormBuilder,
    public router: Router,
    // private activatedRoute: ActivatedRoute,
    public permission: StandardAppPermissionService,
    public location: Location,
    public companyService:StandardCompanyService,
    private alertService: AlertService
  ) {
    super();
    this.absoluteUrl = this.location.path(true);

    this.searchForm = this.fb.group<GroupSearchForm>({
      cpid: this.fb.control(null),
      name: this.fb.control(null),
    })

    if (!this.permission.checkIsSystemAdmin()) {
      // Company admin is scoped to its own company — lock the filter so it can't browse other companies.
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');
      this.criteriaSearch.cpid = currentUser.cpid ?? null;
      this.searchForm.controls.cpid.setValue(currentUser.cpid ?? null);
      this.searchForm.controls.cpid.disable();
    }
  }

  override eventOnClear(_patchValue?: StandardGroup | Partial<StandardGroup>) {
    if (this.permission.checkIsSystemAdmin()) {
      super.eventOnClear(_patchValue);
      return;
    }
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');
    this.searchForm.reset(_patchValue ?? {});
    this.searchForm.controls.cpid.setValue(currentUser.cpid ?? null);
    this.eventOnSearch();
  }

  override async ngOnInit(): Promise<void> {
    await this.getCompanyList(this.searchCompany);
    super.ngOnInit();
  }
  getCompanyList(search: SearchCompany) {
    this.companyService
      .getListCompany(1, 999999, search)
      .subscribe({
        next: (res) => {
          this.responseItemsCompany = (res && res.data && res.data.data) || [];
          this.inputConfig.filter(e => e.formControlName == "cpid").map(map =>{
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
  eventOnchangeGroupStatus(group: StandardGroup) {
    this.alertService.alertMessageOption(
      {
      title: super.translate(this.i18n.alert.titleWarning),
      text: super.translate(this.i18n.group.groupChangeStatus),
      type: "warning",
      ...this.swalConfigs,
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        // let groups = group as StandardGroup;
        let groupValue = new StandardGroup();
        groupValue.gid = group.gid;
        groupValue.isActive = group.isActive !== null ? !Boolean(+group.isActive): false;
        this.fetchDataService.updateStatusGroup(groupValue).subscribe({
          next: (res) => {
            if (res && res.status.toLowerCase() === "success") {
              this.alertService.alertDefaultSuccess(this.i18n.group.groupChangeStatusSuccess).then(
                (result) => {
                  this.eventOnSearch();
                }
              );
            } else if (res && res.status.toLowerCase() === "fail") {
              this.alertService.alertDefaultError(res.message);
              this.isLoading = false;
            } else {
              this.alertService.alertDefaultError(this.i18n.group.groupChangeStatusFailed);
              this.isLoading = false;
            }
          },
          error:(err) => {
            this.isLoading = false;
            console.log(err);
          }
        });
      }
    });
  }
}
