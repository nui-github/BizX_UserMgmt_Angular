import { Component, HostListener, Input, OnInit } from "@angular/core";
import { StandardMenuService } from "../../../pages/standard-menu/services/standard-menu.service";
import { AppConfig } from "../../../../app.config";
import { Router, RouterModule } from "@angular/router";
import { IMenu, MenuSearch } from "../../../pages/standard-menu/models/standard-menu.model";
import _ from "lodash";
import { NzGridModule } from "ng-zorro-antd/grid";
import { Observable } from "rxjs";
import { StandardAppPermissionService } from "../../../core/services/standard-app-permission.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule, NzGridModule],
  templateUrl: "./standard-sidebar.component.html",
  styleUrl: "./standard-sidebar.component.scss",
})
export class StandardSidebarComponent implements OnInit {
  public sidebarType = "full";
  @Input() sidebarTypeState!: Observable<string>;
  public firstLoading = true;
  public isActive: boolean = false;
  public isLoading: boolean = false;
  public showMenu: string = "";
  public menus: IMenu[] = [];
  public sidebarHover = false;
  private readonly systemAdminOnlyMenus = ["Permission Management", "Menu Management", "Token Management", "Register Management"];
  constructor(
    private router: Router,
    private menuService: StandardMenuService,
    private permissions: StandardAppPermissionService,
    public config: AppConfig,
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
    const gid = currentUser.gid;
    this.getMenu(gid);
    this.sidebarTypeState.subscribe((toggle) => {
      this.sidebarType = toggle;
    });
    this.getWindowSize();
  }

  addExpandClass(element: any) {
    this.showMenu = element === this.showMenu ? (this.showMenu = "0") : (this.showMenu = element);
  }

  getMenu(gid: string) {
    this.isLoading = true;
    this.menuService.getMenuList(1, 9999, { gid: gid } as MenuSearch).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.menus = this.groupMenu((res && res.data) || []);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  groupMenu(menus: IMenu[]) {
    if (!this.permissions.checkIsSystemAdmin()) {
      menus = menus.filter((m) => !this.systemAdminOnlyMenus.includes(m.name ?? ""));
    }
    let menuItems: IMenu[] = menus.filter(
      (m) =>
        !m.isSubMenu &&
        m.parentMenuId == "0" &&
        m.name !== "BizX" &&
        m.name !== "BizX-user-menu" &&
        m.name !== "supply-chain-drive",
    );
    for (const menu of menuItems) {
      menu.submenu = this.getSubmenu(menu.id, menus);
    }
    return _.sortBy(menuItems, (m) => m.order);
  }

  getSubmenu(menuId: string | null, menus: IMenu[]) {
    return _.sortBy(
      menus.filter((s) => s.parentMenuId == menuId),
      (s) => s.order,
    );
  }

  toggleSidebar() {
    const dom: HTMLBodyElement | null = document.querySelector("#main-wrapper");
    if (!dom || dom == null) return;
    dom.classList.toggle("show-sidebar");
  }
  onSidebarHover(isHovered: boolean) {
    this.sidebarHover = isHovered;
  }

  @HostListener("window:resize", ["$event"])
  onWindowSize(): boolean {
    if (window.innerWidth && window.innerWidth < 1300) {
      return false;
    } else {
      return true;
    }
  }

  getWindowSize(): boolean {
    if (window.innerWidth && window.innerWidth < 1300) {
      if (this.firstLoading) {
        this.firstLoading = false;
        const checkSidebar: HTMLBodyElement | null = document.querySelector("#main-wrapper");
        if (checkSidebar || checkSidebar !== null) checkSidebar.classList.toggle("show-sidebar");
      }
      return false;
    } else {
      return true;
    }
  }
}
