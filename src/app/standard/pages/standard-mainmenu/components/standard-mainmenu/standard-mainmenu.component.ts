import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StandardAuthService } from '../../../standard-auth/services/standard-auth.service';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { StandardBreadcrumbComponent } from '../../../../shared/components/standard-breadcrumb/standard-breadcrumb.component';
import { StandardHeaderComponent } from '../../../../shared/components/standard-header/standard-header.component';
import { StandardSidebarComponent } from '../../../../shared/components/standard-sidebar/standard-sidebar.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StandardRxStompService } from '../../../../core/services/standard-rx-stomp.service';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { filter, Subject } from 'rxjs';
import { EventToggleSidebar } from '../../../../shared/models/standard-event-emitter.model';

@Component({
  selector: 'app-standard-mainmenu',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule,
    StandardHeaderComponent,
    StandardSidebarComponent,
    StandardBreadcrumbComponent,
    NzBreadCrumbModule,
    NzIconModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    StandardTranslateService
  ],
  templateUrl: './standard-mainmenu.component.html',
  styleUrl: './standard-mainmenu.component.scss'
})
export class StandardMainmenuComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  breadcrumbItems: Array<{ label: string, url: string, title: string }> = [];
  private sidebarTypeStateSubject = new Subject<string>();
  sidebarTypeState$ = this.sidebarTypeStateSubject.asObservable();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private rxStompService: StandardRxStompService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root);
      });
      this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root);
  }
  ngOnDestroy(): void {
    this.rxStompService.deactivate();
  }
  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string, title: string }> = []): Array<{ label: string, url: string, title: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }


      const breadcrumbI18nKey = child.snapshot.data['breadcrumbI18nKey'];
      if (breadcrumbI18nKey) {
        const label = breadcrumbI18nKey ? this.translate.instant(breadcrumbI18nKey) : routeURL;
        const title = label;

        if (!breadcrumbs.some(breadcrumb => breadcrumb.url === url)) {
          breadcrumbs.push({ label, url, title });
        }
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  eventOnToggleSideBar(data: EventToggleSidebar){
    this.sidebarTypeStateSubject.next(data.sidebarType);
  }

}
