import { Component, inject } from '@angular/core';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { IMenu, StandardMenuForm, requiredIfItIsSubmenu } from '../../models/standard-menu.model';
import { StandardMenuService } from '../../services/standard-menu.service';
import { FormGroup } from '@angular/forms';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';


@Component({
  selector: 'app-standard-menu-detail',
  standalone: true,
  imports: [
    NzGridModule,
    NzCardModule,
    StandardFormCardComponent,
    TranslateModule
  ],
  templateUrl: './standard-menu-detail.component.html',
  styleUrl: './standard-menu-detail.component.scss'
})
export class StandardMenuDetailComponent extends StandardFormComponent<IMenu> {
  public override fetchDataService: StandardMenuService = inject(StandardMenuService);
  public override pageTitle: string = this.i18n.menu.pageTitle;
  public mainMenuList: IMenu[] = [];


  public formGroup: FormGroup<StandardMenuForm>;

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "mmnc-menu-name",
      name: "mmnc-menu-name",
      formControlName: "name",
      label: "pages.menu.input.menuName.label",
      sublabel: "pages.menu.input.menuName.sublabel",
      type: 'text',
      showInput: true
    },
    {
      id: "mmnc-menu-url",
      name: "mmnc-menu-url",
      formControlName: "url",
      label: "pages.menu.input.url.label",
      sublabel: "pages.menu.input.url.sublabel",
      type: 'text',
      showInput: true
    },
    {
      id: "mmnc-menu-icon",
      name: "mmnc-menu-icon",
      formControlName: "icon",
      label: "pages.menu.input.icon.label",
      sublabel: "pages.menu.input.icon.sublabel",
      type: 'text',
      showInput: true
    },
    {
      id: "mmnc-menu-order",
      name: "mmnc-menu-order",
      formControlName: "order",
      label: "pages.menu.input.order.label",
      sublabel: "pages.menu.input.order.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'min': { message: "standard.validation.menu.min"}
      }
    },
    {
      id: "mmnc-menu-parent-id",
      name: "mmnc-menu-parent-id",
      formControlName: "parentMenuId",
      label: "pages.menu.input.parentMenuId.label",
      sublabel: "pages.menu.input.parentMenuId.sublabel",
      type: 'select',
      showInput: this.formGroup?.controls.isSubMenu.value ?? false
    },
    {
      id: "empty",
      name: "empty",
      formControlName: "empty",
      label: "empty",
      sublabel: "empty",
      type: 'empty',
      showInput: false
    },
    {
      id: "mmnc-menu-is-submenu",
      name: "mmnc-menu-is-submenu",
      formControlName: "isSubMenu",
      label: "pages.menu.input.isSubMenu.label",
      sublabel: "pages.menu.input.isSubMenu.sublabel",
      type: 'switch',
      showInput: true,
      // changeHandler: this.onSelectSubmenuChanged.bind(this)
    },
    // {
    //   id: "mmnc-menu-is-createDate",
    //   name: "mmnc-menu-is-createDate",
    //   formControlName: "createTime",
    //   label: "createDate",
    //   sublabel: "createDate",
    //   type: 'date',
    //   showInput: true,
    // }
  ]

  constructor() {
    super();

    this.formGroup = this.formService.createFormGroup(StandardMenuForm);
    this.hasPermissions = this.permissions.checkPermissionList([this.APP_PERMISSION['MENU_CREATE'], this.APP_PERMISSION['MENU_EDIT']]);
  }

  override ngOnInit(): void {
    this.getMainMenu();
    super.ngOnInit();

    this.formGroup.controls.isSubMenu?.valueChanges.subscribe((isSubMenu) => {

      if(!isSubMenu){
        this.formGroup.controls.parentMenuId.setValue("");
      }
      this.inputConfig.filter(p => p.formControlName == "parentMenuId").map(map => map.showInput = isSubMenu)

      this.formGroup.controls.parentMenuId?.setValidators(requiredIfItIsSubmenu);
      this.formGroup.controls.parentMenuId?.updateValueAndValidity();
      this.formGroup.controls.url?.setValidators(requiredIfItIsSubmenu);
      this.formGroup.controls.url?.updateValueAndValidity();

      if(this.isSubmit) {
        this.formGroup.controls.parentMenuId?.markAsDirty();
        this.formGroup.controls.url?.markAsDirty();
      }

    });    
    if (this.pageType == "add") {
      this.successMessage = this.i18n.menu.alertMessageCreateSuccess;
      this.failureMessage = this.i18n.menu.alertMessageCreateFailure;
    } else if (this.pageType == "edit") {
      this.successMessage = this.i18n.menu.alertMessageUpdateSuccess;
      this.failureMessage = this.i18n.menu.alertMessageUpdateFailure;
    }
  }

  getMainMenu(){
    this.fetchDataService.getMainMenu().subscribe({
      next: (res) => {
        if (res.status.toLowerCase() === "success") {
          this.mainMenuList = res.data;
          this.inputConfig.filter(p => p.formControlName == "parentMenuId").map(map => {
            map.options = this.mainMenuList.map(menu => this.mapMenuToParentMenuList(menu))
          })

        } else {
          this.mainMenuList = [];
        }
      },
      error: error=>{
        console.log(error);
        this.mainMenuList=[];
      }
    })
  }

  mapMenuToParentMenuList(item: IMenu) {
    return { value: item.id, label: item.name };
  }
}
