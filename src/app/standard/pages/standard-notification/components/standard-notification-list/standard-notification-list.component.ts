import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StandardNotificationService } from '../../services/standard-notification.service';
import { BehaviorSubject, firstValueFrom, Observable, Subject, takeUntil } from 'rxjs';
import { IStandardNotification, StandardSearchNotification } from '../../models/standard-notification.model';
import { Router } from '@angular/router';
import { StandardPagination } from '../../../../shared/models/standard-pagination.model';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standard-notification',
  standalone: true,
  imports: [ CommonModule, ScrollingModule, NzListModule, NzSkeletonModule ],
  templateUrl: './standard-notification-list.component.html',
  styleUrl: './standard-notification-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandardNotificationListComponent implements OnInit, AfterViewInit, OnDestroy {
  private uid!: string;

  public isLoading = false;
  public pagination = new StandardPagination();
  public criteriaSearch = new StandardSearchNotification();
  public totalItems: number = 0;
  public notifications = new NotificationDataSource(this.notificationService, this.pagination.pageSize, this.criteriaSearch, this.totalItems);

  private destroy$ = new Subject<boolean>();

  constructor(private notificationService: StandardNotificationService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
    this.uid = currentUser.uid;
    this.criteriaSearch = new StandardSearchNotification({
      uid: this.uid,
      isSeen: null
    });
    await this.eventOnSearch();
  }

  ngAfterViewInit(): void {
    this.triggerLoadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  triggerLoadData(): void {
    this.notifications = new NotificationDataSource(this.notificationService, this.pagination.pageSize, this.criteriaSearch, this.totalItems);
    this.notifications
      .completed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Finish scroll.');
      });
  }

  async eventOnSearch(): Promise<void> {
    this.criteriaSearch = new StandardSearchNotification({
      uid: this.uid,
      isSeen: null
    });
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      this.isLoading = true;
      let res = await firstValueFrom(
        this.notificationService.getNotification(
          this.pagination.page,
          this.pagination.pageSize,
          this.criteriaSearch
        ));
      this.isLoading = false;
      this.totalItems = res.data.totalElements;
    } catch (e) {
      this.isLoading = false;
    }
  }

  async eventOnClickNotification(item: IStandardNotification): Promise<void> {
    let notiUserId: string[] = [item.id];
    if (await this.updateIsRead(notiUserId)) {
      this.router.navigate([item.routing, item.param]);
    }
  }

  async updateIsRead(notiUserId: string[]): Promise<boolean> {
    try {
      let res = await firstValueFrom(this.notificationService.updateIsReadByUser(this.uid, notiUserId));
      return res && res.data || false
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}

class NotificationDataSource extends DataSource<IStandardNotification> {
  private cachedData: IStandardNotification[] = [];
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<IStandardNotification[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();

  constructor(private notificationService: StandardNotificationService, private pageSize: number, private criteriaSearch: StandardSearchNotification, private totalItems: number) {
    super();
  }

  completed(): Observable<void> {
    return this.complete$.asObservable();
  }

  connect(collectionViewer: CollectionViewer): Observable<IStandardNotification[]> {
    this.setup(collectionViewer);
    return this.dataStream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  private setup(collectionViewer: CollectionViewer): void {
    this.fetchPage(1);
    collectionViewer.viewChange.pipe(takeUntil(this.complete$), takeUntil(this.disconnect$)).subscribe(range => {
      if (this.cachedData.length >= this.totalItems) {
        this.complete$.next();
        this.complete$.complete();
      } else {
        const endPage = this.getPageForIndex(range.end);
        this.fetchPage(endPage + 1);
      }
    });
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private async fetchPage(page: number): Promise<void> {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    let res = await firstValueFrom(
      this.notificationService.getNotification(
        page,
        this.pageSize,
        this.criteriaSearch
      )
    );
    this.totalItems = res.data.totalElements;
    this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.data.content);
    this.dataStream.next(this.cachedData);
  }
}
