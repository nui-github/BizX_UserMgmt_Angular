import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { StandardPermission, StandardPermissionSearch } from '../../models/standard-permission.model';
import { StandardPermissionService } from '../../services/standard-permission.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardInputComponent } from '../../../../shared/components/standard-input/standard-input.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { StandardShowingPageComponent } from '../../../../shared/components/standard-showing-page/standard-showing-page.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


export type PermissionSearchForm = {
  permissionCode: FormControl<string | null>;
}

@Component({
  selector: 'app-standard-permission-list',
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
    TranslateModule,
  ],
  templateUrl: './standard-permission-list.component.html',
  styleUrl: './standard-permission-list.component.scss'
})
export class StandardPermissionListComponent extends StandardTrackingComponent<StandardPermissionSearch, StandardPermission>  {

  public override fetchDataService: StandardPermissionService = inject(StandardPermissionService);
  public override pageTitle: string = this.i18n.permission.pageTitle;
  public override criteriaSearch: StandardPermissionSearch = new StandardPermissionSearch();
  public override responseItems: StandardPermission[] | undefined;
  public override key: string = "id";
  public override absoluteUrl: string;

  public searchForm: FormGroup<PermissionSearchForm>;

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "perm-search-keyword",
      name: "perm-search-keyword",
      formControlName: "permissionCode",
      label: "pages.permission.input.permissionCode.label",
      sublabel: "pages.permission.input.permissionCode.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "fields.placeholder.search"
    }
  ]

  constructor(private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public permission: StandardAppPermissionService,
    public location: Location
  ) {
    super();
    this.absoluteUrl = this.location.path(true);

    this.searchForm = this.fb.group<PermissionSearchForm>({
      permissionCode: this.fb.control(null)
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  // override async fetchData(): Promise<IPaginationResponse<StandardPermission>> {
  //   let paginationResponse: IPaginationResponse<StandardPermission> = {
  //     result: [],
  //     totalRecords: 0
  //   };
  //   try {
  //     this.isLoading = true;
  //     let res = await firstValueFrom(
  //     this.fetchDataService.getPermissionList(
  //       this.pagination.page,
  //       this.pagination.pageSize,
  //       this.criteriaSearch.permissionCode));
  //     this.isLoading = false;
  //     paginationResponse = {
  //       result: res?.data?.data ?? [],
  //       totalRecords: res?.data?.row ?? 0
  //     };
  //     return paginationResponse;
  //   } catch (e) {
  //     this.isLoading = false;
  //     console.log(e);
  //     return paginationResponse;
  //   }
  // }

}
