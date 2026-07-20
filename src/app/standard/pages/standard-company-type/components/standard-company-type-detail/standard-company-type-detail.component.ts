import { Component, inject } from '@angular/core';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { CompanyType, CompanyTypeForm, CompanyTypeMenu, CompanyTypeMenuSearch, ICompanyType, RegisterType, StandardCompanyType } from '../../models/standard-company-type.model';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardCrudService } from '../../../../shared/abstracts/services/standard-crud.service';
import { StandardCompanyTypeService } from '../../services/standard-company-type.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { th } from 'date-fns/locale';
import { StandardResponseStatus } from '../../../../shared/models/standard-response.model';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
@Component({
  selector: 'app-standard-company-type-detail',
  standalone: true,
  imports: [
    NzGridModule,
    NzCardModule,
    StandardFormCardComponent,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NzFormModule
  ],
  templateUrl: './standard-company-type-detail.component.html',
  styleUrl: './standard-company-type-detail.component.scss'
})
export class StandardCompanyTypeDetailComponent extends StandardFormComponent<any> {
  public override fetchDataService: StandardCompanyTypeService = inject(StandardCompanyTypeService);
  public override pageTitle: string = this.i18n.companyType.pageTitle;
  public standardTranslateService:StandardTranslateService = inject(StandardTranslateService);
  public formGroup: FormGroup<CompanyTypeForm>;
  public registerType: RegisterType[] = [];
  public menus: any[] = [];
  public companyTypeMenus: any = [];
  public companyTypeId!: number;
  public permissionsAdd:any;
  public permissionsEdit:any;
  public check:boolean = true;
  public companyType: any = {};
  public menuLabel: string = "page.company.type.menu.label";

  private companyTypeMenuSearch: CompanyTypeMenuSearch = new CompanyTypeMenuSearch();


  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "mnc-company-type-register-type",
      name: "mnc-company-type-register-type",
      formControlName: "companyTypeRegisterType",
      label: "page.company.type.register.type.label",
      sublabel: "page.company.type.register.type.sublabel",
      type: 'select',
      showInput: true,
    },
    {
      id: "mnc-company-type-company-type-name",
      name: "mnc-company-type-company-type-name",
      formControlName: "companyTypeName",
      label: "page.company.type.name.label",
      sublabel: "page.company.type.name.sublabel",
      type: 'text',
      showInput: true,
    }
  ];

  constructor(
    private route : ActivatedRoute
  ) {
    super();
    this.formGroup = new FormGroup<CompanyTypeForm>({
      ... new CompanyTypeForm
    });
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['COMPANY_TYPE_CREATE'], this.APP_PERMISSION['COMPANY_TYPE_EDIT']]);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.companyTypeId = parseInt(idParam !== null ? idParam : '', 10);
    });


    this.permissionsAdd = this.permissions.checkPermission(this.APP_PERMISSION['COMPANY_TYPE_CREATE'])
    this.permissionsEdit = this.permissions.checkPermission(this.APP_PERMISSION['COMPANY_TYPE_EDIT'])

    this.getAllRegisterType();
    if (this.pageType === 'add') {
      this.processPageAdd();
    } else if (this.pageType === 'edit') {
      this.processPageEdit();
    }
  }

  get m() {
    return this.formGroup.controls.menuArr as FormArray;
  }

  get rm() {
    return this.formGroup.controls.companyTypeMenu as FormArray;
  }

  processPageAdd() {
    this.getAllMenu();
  }

  async processPageEdit() {
    this.companyTypeMenuSearch.companyTypeId = +this.companyTypeId;
    this.getCompanyType(this.id ?? "");
    await this.getAll(this.companyTypeMenuSearch);
    this.getAllMenu();
  }

  getCompanyType(companyTypeId: number | string) {
    this.isLoading = true;
    this.fetchDataService.getCompanyById(companyTypeId)
    .subscribe({
      next : (res) => {
        this.isLoading = false;
        this.companyType = res.data ? res.data : {};
        this.patchFormControls(this.companyType);
      }, error: (err) => {
        this.isLoading = false;
        console.error(err)
      }
    })
  }

  getAll(companyTypeMenuSearch: CompanyTypeMenuSearch) {
    return new Promise<any>((resolve) => {
      let getCompanyTypeMenu = this.fetchDataService.getCompanyTypeMenu(companyTypeMenuSearch);
      forkJoin({getCompanyTypeMenu}).subscribe({
        next: (res) => {
          this.companyTypeMenus = (res.getCompanyTypeMenu && res.getCompanyTypeMenu.data) || [];

          resolve(null);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          resolve(null);
        }
      });
    });
  }

  public override patchFormControls(data: any): void {
    this.formGroup.patchValue({
      companyTypeRegisterType: data.registerType.toString(),
      companyTypeName: data.name
    })
    this.formGroup.updateValueAndValidity();
  }

  getAllRegisterType() {
    this.fetchDataService.getAllRegisterType()
      .subscribe({
        next: (res) => {
          if (res.status.toLowerCase() === "success") {
            this.registerType = res.data;
            this.inputConfig
              .filter(p => p.formControlName === 'companyTypeRegisterType')
              .map(config => {
                config.options = this.registerType.map(registerType => this.mapRegisterTypeList(registerType));
              });
          }
        },
        error: (err) => {
          console.error(err);
          this.registerType = [];
        }
      });
  }

  renderMenuName(id: number) {
    return this.menus.find(p => p.id == id).name || ""
  }

  mapRegisterTypeList(item: RegisterType): { label: string | null; value: string | null } {
    return {
      label: item.nameTh,
      value: item.id ? item.id.toString() : null
    };
  }

  getAllMenu() {
    this.fetchDataService.getMenuAll()
      .subscribe({
        next: (res) => {
          if (res.status.toLowerCase() === "success") {
            this.menus = res.data ? res.data : [];
            this.patchMenuValue(this.menus, this.companyTypeMenus);
          }
        },
        error: (err) => {
          console.error(err);
          this.menus = [];
        }
      });
  }


  patchMenuValue(data: any[], mapper?: any[]) {
    const mainmenu = data.filter(p => !p.isSubMenu) || data.filter(p => p.isSubMenu);
    const menuArr = this.formGroup.controls.menuArr;
    this.patchRecursionMenu(menuArr, mainmenu, data, mapper);
    menuArr.updateValueAndValidity();
  }

  patchRecursionMenu(menus: FormArray, mainmenu: any[], data: any[], mapper?: any[]) {
    mainmenu.forEach((m) => {
      const menu = this.fb.group({
        selected: this.fb.control(false),
        parentMenuId: this.fb.control(m.parentMenuId),
        id: this.fb.control(m.id),
        subMenu: this.fb.array([])
      })
      if (this.pageType === 'edit') {
        menu.controls.selected.patchValue(mapper && mapper.some((companyMenu) => companyMenu.id == m.id) || false);

      }
      const submenu = data.filter(p => p.parentMenuId == m.id);
      if (submenu && submenu.length > 0) {
        this.patchRecursionMenu(menu.controls.subMenu as FormArray, submenu, data, mapper);
      };
      menus.push(menu);
    })
  }

  parentMenuChecked(menu: FormGroup) {
    let submenu = <FormArray> menu.get('subMenu');
    if(!submenu || submenu.length == 0) {
      return menu.get('selected')?.value;
    }
    submenu.controls.map(p => p.get('selected')).some(function(p) {
      if (p?.value) {
        menu.get('selected')?.patchValue(p?.value);
      }
    });
    return submenu.controls.map(p => p.get('selected')).some(p => p?.value);
  }

  menuChecked(e: any, menu: FormGroup) {
    let checked = e.target && (<HTMLInputElement>e.target).checked || false;
    let submenu = <FormArray> menu.get('subMenu');
    if(submenu && submenu.length > 0) {
      submenu.controls.map(p => p.get('selected')?.patchValue(checked));
    }
    this.checkedSubMenu(menu.value);
  }

  checkedSubMenu(menu:any) {
    if (menu.parentMenuId > 0 && !menu.selected) {
      const menuArr = this.formGroup.get('menuArr') as FormArray;
      const count = menuArr.length;
      for (let i = 0; i < count; i++) {
        const control = menuArr.at(i) as FormControl;
        if (menu.parentMenuId == control.value.id) {
          const subMenu = control.value.subMenu;
          let checked = false;
          for (let j = 0; j < count; j++) {
            if (subMenu[j].selected) {
              checked = true;
              break;
            }
          }
          if (checked) {
            break;
          } else {
            const fMenuArr = this.formGroup.controls.menuArr as FormArray;
            const fMenuArrControl = fMenuArr.at(i) as FormControl;
            fMenuArrControl.patchValue({
              selected: false
            });
          }
        }
      }
    }
  }

  public override onSave(): void {
    this.isSubmit = true;
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    if (this.pageType == 'add') {
      this.processCreateCompanyType(this.formGroup.getRawValue());
    } else if (this.pageType == 'edit') {
      this.processUpdateCompanyType(this.formGroup.getRawValue());
    }
  }

  getSelectMenu(menu: any[]) {
    let menus: any[] = [];
    this.getSelectRecursionMenu(menus, menu);
    return menus;
  }

  getSelectRecursionMenu(selectedMenu: any[], menu:any[]) {
    menu.forEach((m) => {
      if(m.selected) {
        selectedMenu.push(
          new CompanyTypeMenu(m.id, this.companyTypeId ? +this.companyTypeId : null)
        );
      }
      if(m.subMenu && m.subMenu.length > 0) {
        this.getSelectRecursionMenu(selectedMenu, m.subMenu);
      }
    })
  }

  processCreateCompanyType(fCompanyTypeValue: any) {
    this.isLoading = true;
    let companyType: CompanyType = new CompanyType();

    companyType.registerType = fCompanyTypeValue["companyTypeRegisterType"];
    companyType.name = fCompanyTypeValue["companyTypeName"];
    companyType.companyTypeMenu = this.getSelectMenu(fCompanyTypeValue["menuArr"]);

    if (companyType.companyTypeMenu.length == 0) {
      this.onError(this.standardTranslateService.getTranslated(this.i18n.companyType.alertMessageMenuRequired));
      this.isLoading = false;
      return;
    }

    this.fetchDataService.createCompanyType(companyType).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
          this.onSuccess(this.i18n.companyType.alertMessageCreateSuccess);
        } else {
          this.onError(res.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.onError(this.i18n.companyType.alertMessageCreateFailure);
        console.error("error")
      }
    });
  }

  processUpdateCompanyType(fCompanyTypeValue: any) {
    this.isLoading = true;
    let companyType: CompanyType = new CompanyType();

    companyType.id = +this.companyTypeId;
    companyType.registerType = fCompanyTypeValue["companyTypeRegisterType"];
    companyType.name = fCompanyTypeValue["companyTypeName"];
    companyType.companyTypeMenu = this.getSelectMenu(fCompanyTypeValue["menuArr"]);

    if (companyType.companyTypeMenu.length == 0) {
      this.onError(this.standardTranslateService.getTranslated(this.i18n.companyType.alertMessageMenuRequired));
      this.isLoading = false;
      return;
    }

    this.fetchDataService.updateCompanyType(companyType).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.onSuccess(this.i18n.companyType.alertMessageUpdateSuccess);
        } else {
          this.onError(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.onError(this.i18n.companyType.alertMessageUpdateFailure);
      }
    });
  }


}
