import { Component, ContentChild, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { StandardThemeService, Theme } from '../../../core/services/standard-theme.service';
import Swal from 'sweetalert2';
import { StandardAuthService } from '../../../pages/standard-auth/services/standard-auth.service';
import { Router } from '@angular/router';
import { BsModalService, ModalModule, ModalOptions } from 'ngx-bootstrap/modal';
import { StandardChangePasswordComponent } from '../../../pages/standard-auth/components/standard-change-password/standard-change-password.component';
import { IStandardNotification } from '../../../pages/standard-notification/models/standard-notification.model';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { StandardLoginResponse } from '../../../pages/standard-auth/models/standard-auth.model';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { StandardNotificationComponent } from '../../../pages/standard-notification/components/standard-notification/standard-notification.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { EventToggleSidebar } from '../../models/standard-event-emitter.model';
import { DEMO_ACCOUNTS, DemoAccountRole } from '../../../core/mock/demo-account.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ModalModule,
    NzAvatarModule,
    StandardNotificationComponent,
    TranslateModule
  ],
  templateUrl: './standard-header.component.html',
  styleUrl: './standard-header.component.scss'
})
export class StandardHeaderComponent implements OnInit {
  @Output() public toggleSidebarEvent = new EventEmitter<EventToggleSidebar>();
  mdConfig: ModalOptions = {
    animated: false,
    class: "modal-xl",
    ignoreBackdropClick: false,
    keyboard: true,
  };

  @ContentChild('notificationDropdownHeader', { static: false }) notificationDropdownHeader!: TemplateRef<any> | null;
  @ContentChild('profileDropdownHeader', { static: false }) profileDropdownHeader!: TemplateRef<any> | null;

  sidebarFull: string = "full";
  sidebarMini: string = "mini-sidebar";
  selectedTheme: string = "";
  public currentUser!: StandardLoginResponse;

  public userProfile = "pages.standard.header.menu.profile.user.profile";
  public myProfile = "pages.standard.header.menu.profile.my.profile";
  public accountSetting = "pages.standard.header.menu.profile.account.setting";
  public changePasswordMessage = "pages.standard.header.menu.profile.change.password";
  public logOutMessage = "pages.standard.header.menu.profile.logout";

  // Demo-only account switcher — see core/mock/demo-account.config.ts.
  public demoAccounts = DEMO_ACCOUNTS;
  public isSwitchingAccount = false;

  constructor(private themeService: StandardThemeService,
    private authenService: StandardAuthService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser") ?? "{}");
    const dom = document.getElementById('profileImage');
    if(dom != null) {
      dom.textContent = this.currentUser.profileName;
    }

    this.selectedTheme = this.themeService.selectedTheme;
  }

  get currentDemoRole(): DemoAccountRole {
    return this.currentUser?.username === this.demoAccounts.platform.username ? 'platform' : 'company';
  }

  switchAccount(role: DemoAccountRole) {
    if (role === this.currentDemoRole || this.isSwitchingAccount) return;
    const account = this.demoAccounts[role];
    this.isSwitchingAccount = true;
    this.authenService.login(account.username, account.password).subscribe({
      next: () => window.location.reload(),
      error: () => {
        this.isSwitchingAccount = false;
        this.toastr.error('Switch account failed');
      }
    });
  }

  toggleSidebar() {
    const dom: HTMLBodyElement | null = document.querySelector("body");
    if(!dom || dom == null) return;
    let type = this.sidebarMini;
    if(dom.dataset['sidebartype'] == this.sidebarFull) {
      dom.dataset['sidebartype'] = this.sidebarMini;
    } else {
      dom.dataset['sidebartype'] = this.sidebarFull;
      type = this.sidebarFull;
    }
    const checkSidebar: HTMLBodyElement | null = document.querySelector("#main-wrapper");
    if(!checkSidebar || checkSidebar == null) return;
    const isSidebarShown = checkSidebar.classList.toggle('show-sidebar');
    const data = new EventToggleSidebar();
    data.sidebarType = type;
    data.toggleSidebar = isSidebarShown;
    this.toggleSidebarEvent.emit(data);
  }

  toggleTheme(theme: string) {
    this.selectedTheme = theme;
    this.themeService.setSelectedTheme(theme as Theme);
  }

  logout() {
    Swal.fire({
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.authenService.logout().subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

  changePassword() {
    const initialState: ModalOptions = {
      initialState: {
        title: "Change Password",
        pageType: 'modal'
      },
      ...this.mdConfig,
      animated: true
    };
    this.modalService.show(StandardChangePasswordComponent, {
      ...initialState,
    });
  }

  profileSetting() {
    this.router.navigate(["/mainmenu/profile-setting"]);
  }

  showToastr(result: IStandardNotification) {
    this.toastr.info(result.detail, result.subject)
      .onTap
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([result.routing, result.param]);
      });
  }
  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language)
    window.location.reload();
  }

  lang(language: string): boolean{
    let lang = localStorage.getItem('lang');
    if(lang){
      return lang == language;
    }
    return false;
  }
  countNotification(count: number){
  }
}
