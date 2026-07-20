import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StandardRxStompService } from '../../../../core/services/standard-rx-stomp.service';
import { StandardNotificationService } from '../../services/standard-notification.service';
import { firstValueFrom } from 'rxjs';
import { IStandardNotification, StandardSearchNotification } from '../../models/standard-notification.model';
import { Router } from '@angular/router';
import { StandardPagination } from '../../../../shared/models/standard-pagination.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-standard-notification',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './standard-notification.component.html',
  styleUrl: './standard-notification.component.scss'
})
export class StandardNotificationComponent implements OnInit {
  @Input() public limitSize: number = 40;
  @Input({ required: true }) public uid!: string;
  @Input() public totalNotification: number = 0;
  @Output() public onPushedNotification = new EventEmitter();

  public isLoading = false;
  public pagination = new StandardPagination();
  public criteriaSearch = new StandardSearchNotification();
  public notifications: IStandardNotification[] = [];
  public notificationMessageTitle = "pages.standard.notification.message.titile";
  public notificationMessageNews = "pages.standard.notification.message.new"; 
  public notificationMessageSeeAllNoti = "pages.standard.notification.message.see.all"; 
  constructor(private rxStompService: StandardRxStompService,
    private notificationService: StandardNotificationService,
    private router: Router) { }

  ngOnInit(): void {
    this.rxStompService.watch('/user/topic/messages').subscribe((message: any) => {
      // this.receivedMessages.push(message.body);
      this.onNotifyMessage(message);
    });

    this.countNotification();
    this.eventOnSearch();
  }

  onSendMessage() {
    const message = `Message generated at ${new Date()}`;
    this.rxStompService.publish({ destination: '/app/hello', body: message });
  }

  onNotifyMessage(message: any) {
    ++this.totalNotification;
    this.onPushedNotification.emit(message);
  }

  eventOnSearch() {
    this.criteriaSearch = new StandardSearchNotification({
      uid: this.uid,
      isSeen: null
    });
    this.fetchData();
  }

  async countNotification() {
    try {
      let res = await firstValueFrom(
        this.notificationService.countNotiByUser(this.uid));
      this.totalNotification = (res && res.data) || 0;
    } catch (e) {
      this.totalNotification = 0
    }
  }

  async fetchData() {
    try {
      this.isLoading = true;
      let res = await firstValueFrom(
        this.notificationService.getNotification(
          this.pagination.page,
          this.pagination.pageSize,
          this.criteriaSearch
        ));
      this.isLoading = false;
      this.notifications = res.data.content || [];
    } catch (e) {
      this.isLoading = false;
      this.totalNotification = 0
    }
  }

  async eventOnClickNotification(item: IStandardNotification) {
    let notiUserId: string[] = [item.id];
    if(await this.updateIsRead(notiUserId)) {
      this.countNotification();
      this.eventOnSearch();
      this.router.navigate([item.routing, item.param]);
    }
  }

  async updateIsSeen(notiUserId: string[]) {
    try {
      let res = await firstValueFrom(this.notificationService.updateIsSeenByUser(this.uid, notiUserId));
      return res && res.data || false
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateIsRead(notiUserId: string[]) {
    try {
      let res = await firstValueFrom(this.notificationService.updateIsReadByUser(this.uid, notiUserId));
      return res && res.data || false
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  eventGo2Tracking(): void {
    this.router.navigate(['/mainmenu/notification']);
  }

}
