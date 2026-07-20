import { Component, inject } from '@angular/core';
import { IMenu, Menu, MenuSearch, StandardMenuSearchForm } from '../../models/standard-menu.model';
import { StandardTrackingComponent } from '../../../../shared/abstracts/components/standard-tracking/standard-tracking.component';
import { StandardMenuService } from '../../services/standard-menu.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { IPaginationResponse } from '../../../../shared/models/standard-response.model';
import { firstValueFrom } from 'rxjs';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { StandardShowingPageComponent } from '../../../../shared/components/standard-showing-page/standard-showing-page.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
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
  templateUrl: './standard-menu-list.component.html',
  styleUrl: './standard-menu-list.component.scss'
})
export class StandardMenuListComponent extends StandardTrackingComponent<MenuSearch, IMenu>{
  public override fetchDataService: StandardMenuService = inject(StandardMenuService);
  public override pageTitle: string = this.i18n.menu.pageTitle;
  public override criteriaSearch: MenuSearch = new MenuSearch();
  public override responseItems: IMenu[] | undefined;
  public override key: string = "id";
  public override absoluteUrl: string;

  public searchForm: FormGroup;

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "mmnc-menu-name",
      name: "mmnc-menu-name",
      formControlName: "name",
      label: "pages.menu.input.menuName.label",
      sublabel: "pages.menu.input.menuName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "Search Menu Name..."
    },
    {
      id: "mmnc-menu-url",
      name: "mmnc-menu-url",
      formControlName: "url",
      label: "pages.menu.input.url.label",
      sublabel: "pages.menu.input.url.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "Search Menu Url..."
    }
  ];

  constructor(private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public permission: StandardAppPermissionService,
    public location: Location
  ) {
    super();
    this.absoluteUrl = this.location.path(true);
    this.searchForm = this.formService.createFormGroup(StandardMenuSearchForm);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  // async fetchData(): Promise<IPaginationResponse<IMenu>> {
  //   let res = await firstValueFrom(
  //     this.fetchDataService.getMenuManageList(
  //       this.pagination.page,
  //       this.pagination.pageSize,
  //       this.criteriaSearch));

  //   const paginationResponse: IPaginationResponse<IMenu> = {
  //       result: res?.data?.data ?? [],
  //       totalRecords: res?.data?.row ?? 0
  //   };
  //   return paginationResponse;
  // }
}
