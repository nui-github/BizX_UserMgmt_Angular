import { Injectable } from '@angular/core';
import { Observable, retry, timeout } from 'rxjs';
import { IPage, StandardResponse } from '../../../shared/models/standard-response.model';
import { AppConfig } from '../../../../app.config';
import { HttpClient } from '@angular/common/http';
import { IStandardNotification, StandardSearchNotification } from '../models/standard-notification.model';

@Injectable({
  providedIn: 'root'
})
export class StandardNotificationService {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  /**
  * get number of unseen notification
  * 
  * @param uid user id
  * @return {number} number of unseen notification
  */
  countNotiByUser(uid: string): Observable<StandardResponse<number>> {
    return this.http
      .post<StandardResponse<number>>(`${this.config.apiUrl}/users/notify/count-notification`, {
        uid: uid
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * get notification by user
   * 
   * @param {number} pageNum number of page
   * @param {number} pageSize size of page
   * @param {SearchNotification} search notification search
   * @return description of notification
   */
  getNotification(pageNum: number, pageSize: number, search: StandardSearchNotification): Observable<StandardResponse<IPage<IStandardNotification>>> {
    return this.http
      .post<StandardResponse<IPage<IStandardNotification>>>(`${this.config.apiUrl}/users/notify/get-notification`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...search
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * update seen notification of user
   * 
   * @param {string} uid user id
   * @param {string[]} notiUserId notification user id
   * @return
   */
  updateIsSeenByUser(uid: string, notiUserId: string[]) {
    return this.http
      .post<StandardResponse<boolean>>(`${this.config.apiUrl}/users/notify/update-seen`, {
        uid: uid,
        id: notiUserId
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * update read notification of user
   * 
   * @param {string} uid user id
   * @param {string[]} notiUserId notification user id
   * @return
   */
  updateIsReadByUser(uid: string, notiUserId: string[]) {
    return this.http
      .post<StandardResponse<boolean>>(`${this.config.apiUrl}/users/notify/update-read`, {
        uid: uid,
        id: notiUserId
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
