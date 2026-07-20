import { Component, OnInit, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StandardAuthService } from '../../../../pages/standard-auth/services/standard-auth.service';
import { StandardResponse, StandardResponseStatus } from '../../../models/standard-response.model';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StandardPermissionService } from '../../../../pages/standard-permission/services/standard-permission.service';
import { StandardChangePasswordComponent } from '../../../../pages/standard-auth/components/standard-change-password/standard-change-password.component';
import { Permission, StandardPermissionSearch } from '../../../../pages/standard-permission/models/standard-permission.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuSearch } from '../../../../pages/standard-menu/models/standard-menu.model';
import { AppConfig } from '../../../../../app.config';
import { Router } from '@angular/router';
import { StandardMenuService } from '../../../../pages/standard-menu/services/standard-menu.service';

@Component({ template: '' })
export class StandardLoginFormComponent implements OnInit {

  public formGroup!: FormGroup;
  public username!: FormControl;
  public password!: FormControl;
  public remember!: FormControl;
  public isSubmit: boolean = false;
  public isLoading: boolean = false;
  public configuration: {[key:string]: string} = {};
  public modalRef!: BsModalRef;

  private swalConfig: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };

  mdConfig: ModalOptions = {
    animated: false,
    class: "modal-xl",
    ignoreBackdropClick: false,
    keyboard: true,
  };

  public authenService: StandardAuthService = inject(StandardAuthService);
  public permissionService: StandardPermissionService = inject(StandardPermissionService);
  public menuService: StandardMenuService = inject(StandardMenuService);
  private modalService: BsModalService = inject(BsModalService);
  public router: Router = inject(Router);
  public config: AppConfig = inject(AppConfig);

  private searchPermission: StandardPermissionSearch = new StandardPermissionSearch();

  constructor() {

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.isSubmit = true;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    this.login(this.username?.value, this.password?.value);
  }

  async login(username: string, password: string) {
    try {
      this.isLoading = true;
      let res = await firstValueFrom(this.authenService.login(username, password));
      this.isLoading = false;
      if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
        await this.processLoginSuccess(res);
      } else {
        await this.processLoginFail(res);
      }
    } catch (err) {
      this.isLoading = false;
      this.processLoginError();
    }
  }

  async getSession(username: string, password: string) {
    try {
      let swalResult = await Swal.fire({
        title: "Warning",
        html: "This username has not been logged out.<br/>Do you want to login?",
        type: "warning",
        ...this.swalConfig,
      })

      if(swalResult.dismiss || !swalResult.value) return;

      let res = await firstValueFrom(this.authenService.getSession(username, password));
      if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS && res.code == null) {
        await this.processLoginSuccess(res);
      } else {
        await this.processLoginFail(res);
      }
    } catch (err) {
      this.processLoginError();
    }
  }

  async processLoginSuccess(res: StandardResponse<any>) {
    if (res.data && res.data.firstLogin) {
      this.changePassword();
      return;
    }

    let permission = await firstValueFrom(this.permissionService
      .getPermissionListInformation(1, 9999, this.searchPermission.permissionCode));
    this.setPermissionList(permission.data ? permission.data.data : []);

    //this.router.navigate(["/mainmenu"]);
    this.redirectToHomePage(res.data.gid);
  }

  async processLoginFail(res: StandardResponse<any>) {
    let responseCode = ["NOT_FOUND_CODE", "INACTIVE_USER_CODE", "COMPANY_INACTIVE", "GROUP_INACTIVE", "LOCK_USER_CODE"];

    if (res.code === "DUPLICATE_LOGIN") {
      await this.getSession(this.username?.value, this.password.value);
      return;

    } else if (res.code === "PASSWORD_EXPIRED") {
      this.changePassword();
      return;
    }

    let message = "Something wen't wrong. Please contact your administrator.";
    if (responseCode.includes(res.code)) {
      message = res.message;
    }

    Swal.fire({
      title: "Login Failed",
      text: message,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Close",
      customClass: {
        confirmButton: "btn btn-secondary btn-fill swal2-close-btn",
      }
    });
  }

  processLoginError() {
    Swal.fire({
      title: "Login Failed",
      text: "Can't connect to server. Please contact your administrator.",
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Close",
      customClass: {
        confirmButton: "btn btn-secondary btn-fill swal2-close-btn",
      }
    });
  }

  changePassword() {
    const initialState: ModalOptions = {
      initialState: {
        title: "Change Password",
        pageType: 'modal',
        NavigatFrom:'login'
      },
      ...this.mdConfig,
      animated: true
    };
    this.modalRef = this.modalService.show(StandardChangePasswordComponent, {
      ...initialState,
    });

    this.modalRef.content.event.subscribe({
      next: (result: any) => {
        if (result) {
          const currentUser = JSON.parse(
            sessionStorage.getItem("currentUser") || "{}"
          );
          this.username.setValue(currentUser.username);
          this.password.setValue(result);
          this.login(this.username?.value, this.password?.value);
        }
      }
    });
    // this.router.navigate([this.AUTH_ROUTE.CHANGE_PASSWORD]);
  }

  getPermissionListInformation() {
    this.permissionService
      .getPermissionListInformation(1, 9999, this.searchPermission.permissionCode)
      .subscribe({
        next: (res) => {
          this.setPermissionList(res.data ? res.data.data : []);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  setPermissionList(data: Permission[] | undefined) {
    if (!data || data.length === 0) {
      return;
    }
    const output: any = {};
    const permissions = new Map();
    data.forEach(element => {
      permissions.set(element.permissionCode, element.permissionCode);
    });
    permissions.forEach((value, key) => {
      const keys = key.split('.');
      const last = keys.pop();
      keys.reduce((r: { [x: string]: {}; }, a: string | number) => r[a] = r[a] || {}, output)[last] = value;
    });
    sessionStorage.setItem("permissionList", JSON.stringify(output));
  }

  async redirectToHomePage(gid: string) {
    let defaultRouterNavigate = this.config.application?.['homePage'];
    if(defaultRouterNavigate) {
      this.router.navigate([defaultRouterNavigate]);
      return;
    }

    if (gid) {
      const menus = await this.getMenus(gid);
      if (menus != null) {
        for (const menu of menus) {
          if (menu.url === defaultRouterNavigate) {
            this.router.navigate([menu.url]);
            return;
          }
        }
      }
    }
    this.router.navigate(["/mainmenu"]);
  }

  getMenus(gid: string): any {
    return new Promise<any>((resolve) => {
      this.menuService.getMenuList(1, 9999, { gid: gid } as MenuSearch).subscribe({
        next: (res) => {
          resolve(res.data ? res.data : []);
        },
        error: (err) => {
          // this.isLoading = false;
          resolve([]);
        }
      });
    });
  }

}
